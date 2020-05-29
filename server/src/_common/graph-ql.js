const { buildSchema } = require('graphql');
const usersgl = require('../users/graph-ql');

exports.schema = buildSchema(usersgl.schema);
exports.root = usersgl.root;
