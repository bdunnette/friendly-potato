var ddoc = {
  _id: '_design/register',
  rewrites: [
    { from: '_db',     to: '../..' },
    { from: '_db/*',   to: '../../*' },
    { from: '_ddoc',   to: '' },
    { from: '_ddoc/*', to: '*' },
    { from: '/',       to: 'index.html' },
    { from: '/*',      to: '*' }
  ],
  views: {
    "transactions": {
      "map": "function(doc) {if (doc.transactionType) {emit(doc.date, doc);}}"
    },
    "products": {
      "map": "function(doc) {if (doc.listPrice) {emit(doc.name, doc);}}"
    },
    "taxes": {
      "map": "function(doc) {if (doc.taxRate) {emit(doc.startDate, doc);}}"
    }
  },
  shows: {},
  lists: {},
  validate_doc_update: function(newDoc, oldDoc, userCtx) {
    if (newDoc._deleted === true && userCtx.roles.indexOf('_admin') === -1) {
      throw 'Only admin can delete documents on this database.';
    }
  }
};
module.exports = ddoc;
