const { MessageEmbed } = require('discord.js');
const moment = require('moment');

  exports.run = async (client, message, args) => {

    let heartbeat = 0;

    client.ws.shards.each( shard => {

      heartbeat += shard.ping

    })

    message.channel.send('Pinging...').then( m => {
      return m.edit("Pong!", new MessageEmbed().setDescription(`⏳ ${roundTo(client.ws.ping,2)} ms\n\n📤 ${roundTo(m.createdAt - message.createdAt)} ms\n\n💓 ${roundTo(heartbeat / client.ws.shards.size)} ms`)
      .setColor("GREY")
    })
  }
}

function roundTo(n, digits) {
    var negative = false;
    if (digits === undefined) {
        digits = 0;
    }
        if( n < 0) {
        negative = true;
      n = n * -1;
    }
    var multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    n = (Math.round(n) / multiplicator).toFixed(2);
    if( negative ) {
        n = (n * -1).toFixed(2);
    }
    return n;
}

    exports.help = {
      name: 'ping'
    }
