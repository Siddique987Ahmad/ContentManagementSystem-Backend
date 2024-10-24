const mongoose = require('mongoose');

const auditLogSchema =mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  action: {
    type: String,
    enum: ['create', 'update', 'delete'],  // Actions performed in CMS
    required: true
  },
  resourceType: {
    type: String,
    enum: ['content', 'user', 'category', 'tag'],  // What type of resource was affected
    required: true
  },
  resourceId: {
    type: mongoose.Schema.Types.ObjectId,  // ID of the affected resource
    required: true
  }
},{timestamps:true});

module.exports = mongoose.model('AuditLog', auditLogSchema);
