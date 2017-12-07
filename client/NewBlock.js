import sha256 from 'js-sha256';

Template.NewBlock.events({
    'click #btn_add': function (event, template) {
        $('#new_block_modal').modal('show');
    },
    'click #btn_hash': function (event, template) {
        $(".ui.dimmer").addClass("active");
        var str = $('#txt_from').val() + " " + $('#txt_to').val() + " " + $('#txt_amount').val();
        var i = 1;
        var hash = sha256.hmac.update('1', str);
        var hash_str = hash.toString();
        while (hash_str.substring(0, 4) != "0000") {
            i += 1;
            hash = sha256.hmac.update(i.toString(), str);
            hash_str = hash.toString();
        }
        $('#txt_hash').text(hash);
        $('#txt_nounce').val(i);
        $(".ui.dimmer").removeClass("active");
    },
    'click #btn_submit': function (event, template) {
        $(".ui.dimmer").addClass("active");
        var from_str = $('#txt_from').val();
        var from_int = parseInt(from_str);
        var amount_str = $('#txt_amount').val();
        var amt = parseInt(amount_str);
        var valid_all = true;

        for (var i = 1; i < 7; i++) {
            var btn_str = '#btn_device_'+ i.toString();
            $(btn_str).addClass("loading");

            var valid = false;
            var current = 0;
            Blocks.find({
                device: i,
                to: from_str
            }).map(function (block) {
                current += parseInt(block.amount);
            })
            Blocks.find({
                device: i,
                from: from_str
            }).map(function (block) {
                current -= parseInt(block.amount);
            })

            $(btn_str).removeClass("loading");
            if (from_int == 0) {
                valid = true;
            } else if (current >= amt) {
                valid = true;
            }
            if (valid){
                $(btn_str).addClass("positive");
            } else {
                $(btn_str).addClass("negative");
            }
            valid_all = valid_all && valid;
        }

        if (valid_all) {
            var to_str = $('#txt_to').val();
            var number = $("#in_count").val();
            var prev = $("#in_prev").val();
            var nounce = $("#txt_nounce").val();
            var hash_str = $('#txt_hash').text();
            for (i = 1; i < 7; i++) {
                Blocks.insert({
                    device: i,
                    nounce: nounce,
                    block_number: number,
                    hash: hash_str,
                    previous_hash: prev,
                    from: from_str,
                    to: to_str,
                    amount: amount_str
                });
            }
        }
        $(".ui.dimmer").removeClass("active");
    }
})