Blocks = new Mongo.Collection('blocks');

BlockSchema = new SimpleSchema({
    device: {
        type: Number,
        label: "Device"
    },
    block_number: {
        type: Number,
        label: "Block Number"
    },
    nounce: {
        type: Number,
        label: "Nonce"
    },
    hash: {
        type: String,
        label: "Hash"
    },
    previous_hash: {
        type: String,
        label: "Previous Hash",
        optional: true
    },
    from: {
        type: String,
        label: "From"
    },
    to: {
        type: String,
        label: "To"
    },
    amount: {
        type: Number,
        label: "Amount"
    }
});

Blocks.attachSchema(BlockSchema);