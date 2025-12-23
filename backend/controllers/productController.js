const Product = require('../models/Product.js');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');

const getProducts = async (req, res) => {
    try {
        const pageSize = 12;
        const page = Number(req.query.page) || 1;

        const keyword = req.query.keyword
            ? {
                name: {
                    $regex: req.query.keyword,
                    $options: 'i',
                },
            }
            : {};

        const category = req.query.category && req.query.category !== 'All'
            ? { category: req.query.category }
            : {};

        const filter = { ...keyword, ...category };

        const count = await Product.countDocuments(filter);

        const products = await Product.find(filter)
            .sort({ createdAt: -1 })
            .limit(pageSize)
            .skip(pageSize * (page - 1));

        res.json({ products, page, pages: Math.ceil(count / pageSize) });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('user', 'name email');
        if (product) {
            res.json(product);
        }
        else {
            res.status(404).json({ message: 'Product not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const createProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            category,
            condition,
            price,
            location,
            contactPhone
        } = req.body;

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'Please upload at least one image' });
        }

        const imageUrls = [];
        for (const file of req.files) {
            const result = await cloudinary.uploader.upload(file.path, {
                folder: 'rely-tailors/products',
            });
            imageUrls.push(result.secure_url);

            try {
                fs.unlinkSync(file.path);
            } catch (error) {
                console.error('Error deleting local file:', error);
            }
        }

        const product = new Product({
            user: req.user._id,
            name,
            description,
            basePrice: Number(price),
            category,
            condition,
            location,
            contactPhone,
            images: imageUrls,
            imageUrl: imageUrls[0],
            customizations: [],
            numReviews: 0,
            rating: 0
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message || 'Product creation failed' });
    }
};

const updateProduct = async (req, res) => {
    const { name, description, basePrice, category, imageUrl, customizations } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name || product.name;
        product.description = description || product.description;
        product.basePrice = basePrice || product.basePrice;
        product.category = category || product.category;
        product.imageUrl = imageUrl || product.imageUrl;
        product.customizations = customizations || product.customizations;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    }
    else {
        res.status(404).json({ message: 'Product not found' });
    }
};

const deleteProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        await product.deleteOne();
        res.json({ message: 'Product removed' });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

const createProductReview = async (req, res) => {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
        const alreadyReviewed = product.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        );

        if (alreadyReviewed) {
            res.status(400).json({ message: 'Product already reviewed' });
            return;
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        };

        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            product.reviews.length;

        await product.save();
        res.status(201).json({ message: 'Review added' });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductReview
};