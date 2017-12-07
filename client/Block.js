import sha256 from 'js-sha256';
Template.Block.events({
    'click #btn_mine': function (event, template){
        var str = $('#txt_from').val() + " " + $('#txt_to').val() + " " + $('#txt_amount').val();
        var i = 1;
        var hash = sha256.hmac.update('1', str);
        var hash_str = hash.toString();
        while (hash_str.substring(0,4) != "0000"){
            i += 1;
            hash = sha256.hmac.update(i.toString(), str);
            hash_str = hash.toString();
        }
        $('#txt_hash').text(hash);
        $('#txt_nounce').val(i);
        alert("done");
    }
});