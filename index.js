/*
dongle-pie, awful name in restrospective i should have named it dongle master lol but our plan is the following:
using the power of df we will jusr do some funky shiiiit
*/
var events = require('events').EventEmitter;
var bufferState = [];
var execDf = function(callback){
  const { exec } = require('child_process');
  exec(' df --output=source,fstype,used,avail,target', (err, stdout, stderr) => {
    if (err) return callback(err, null);
    if(!stderr){
      var lines = stdout.split("\n");
      var output = [];
      if(lines.length>0){
        for(i = 1; i < lines.length - 1; i++) {
          var dataDf = lines[i].split(/\s+/);
          if(dataDf.length==5){
            output.push({
              source : dataDf[0],
              fstype : dataDf[1],
              used : dataDf[2],
              avail : dataDf[3],
              target : dataDf[4]
            });
          }
        }
      }
      return callback(null, output);
    }
  });
}
module.exports = {
  watchStorage : function(filter = function(path){
    return (path.split("/")[1]=="media");
  }, interval = 1000){
    setInterval(function(filter){
      execDf(function(err, mountedDrives){
        if(err) return;
        for(i_mounted = 0; i_mounted < mountedDrives.length; i_mounted++) {
          if(filter(mountedDrives[i_mounted].target)){
            var is_new = true;
            for(i_buffer = 0; i_buffer < bufferState.length; i_buffer++) {
              if(bufferState[i_buffer].target==mountedDrives[i_mounted].target){
                is_new = false;
                break;
              }
            }
            if(is_new){
              module.exports.storage.emit('newDevice', mountedDrives[i_mounted]);
            }
          }
        }
        if(bufferState.length>mountedDrives.length){
            for(i_buffer = 0; i_buffer < bufferState.length; i_buffer++) {
              if(filter(bufferState[i_buffer].target)){
                var is_removed = true;
                for(i_mounted = 0; i_mounted < mountedDrives.length; i_mounted++) {
                    if(mountedDrives[i_mounted].target==bufferState[i_buffer].target){
                      is_removed = false;
                      break;
                    }
                }
                if(is_removed){
                  module.exports.storage.emit('removedDevice', bufferState[i_buffer]);
                }
              }
            }
        }
        bufferState = mountedDrives;
      })
    }, interval, filter);
  },
  getCurrentlyMounted : function(callback){execDf(callback)},
  storage : new events.EventEmitter()
}
