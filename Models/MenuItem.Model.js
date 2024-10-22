const mongoose = require('mongoose');

const menuItemSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['internal', 'external', 'custom']  // Internal link, external URL, or custom content
  },
  url: {
    type: String,  // For both internal and external links
    required: function() {
      return this.type === 'internal' || this.type === 'external'; // URL is required for internal/external links
    }
  },
  customContent: {
    type: String,
    required: function() {
      return this.type === 'custom'; // Custom content is required for custom menu items
    },
    trim: true
  },
  parentItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MenuItem',
    default: null  // For hierarchical menus (e.g., dropdown menus)
  },
  order: {
    type: Number,
    default: 0  // To control the display order of menu items
  },
  isActive: {
    type: Boolean,
    default: true
  },
  deletedAt: {
    type: Date,
    default: null  // For soft deletes
  }
}, { timestamps: true });

module.exports = mongoose.model('MenuItem', menuItemSchema);
