# Dongle Pie

This is a node.JS module that will let you listen for new flash media on linux based system. It works by essentially exploiting the wonderful **df** command. **FOR LINUX ONLY**.

>Goal of this project is to allow people to easily listen to usb devices or mounted devices without much hassle.

### Installation

dongle-pie is a npm porduct.

```sh
$ npm i dongle-pie
```

### Getting Started :: Query Currently Mounted

You can create one of two things with this system, a listener for new and current media devices or just query the currently mounted devices.

```
var dongleDetector = require('dongle-pie');
dongleDetector.getCurrentlyMounted(function(err, devices){
  console.log(devices);
});
```

This will output an array of mounted media, this will apply no filter on the ouput devices. *We will discuss filtering on the listener section of this guide.*

The output will contain the following contents: 

| Option | Options |
| ------ | ------ |
| source | Name of the mounted media. |
| fstype | File system type of the media.|
| used | Size of used space in media. Unparesed in raw bytes. |
| avail | Size of available space in media. Unparesed in raw bytes.  |
| target | Path location of where media is mounted. |

### Getting Started :: Create Event Listneres for Mounted

As discussed, you can also create event listneres that will get called on new or removed mounted media as such.

```
var dongleDetector = require('dongle-pie');

dongleDetector.watchStorage();

dongleDetector.storage.on('newDevice', function(drive){
  console.log("we want to link ->"+drive.target);
});

dongleDetector.storage.on('removedDevice', function(drive){
  console.log("we want to unlink ->"+drive.target);
});
```

This will create a rather basic event listener. By default we apply a filter on a signal as well as set a default 1000ms interval between df query. The default signal filter is applied and it will only call the ***newDevice*** if thie new or removed drive is mounted on a ***"/media/"***. Do note you can overide them and listen to any and all new media like such.

````
dongleDetector.watchStorage(filter, interval);
````
We expect a function in the filter and an interval in int format in ***ms***.

Lets create a listener that will trigger on any new media and not just media mounted to "/media/".
```
var dongleDetector = require('dongle-pie');

dongleDetector.watchStorage(function(driveToFilter){
    return true;
}, 500);

dongleDetector.storage.on('newDevice', function(drive){
  console.log("we want to link ->"+drive.target);
});

dongleDetector.storage.on('removedDevice', function(drive){
  console.log("we want to unlink ->"+drive.target);
});
```

We created listeners that will be called on any and all mounted media events with a query interval of 500ms.

### Todos

 - Mac compatibility
 - Tests
 - Less strict parsing df qurery rules.

License
----

MIT

