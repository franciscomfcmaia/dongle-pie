# Dongle Pie

This is an unoficial API written in node.js for King's College London timetable fetching service.

  - Export Timetables as JSON or XML
  - Specify start and end date for timetable fetching
  - Parser for JSON fetched data

Kings table totally unofficial and does not in any way reflect reality of the timetable system. I simply did my best to figure it out.

>Goal of this project is to allow students to make their own 
>front end or even notification system, making our lifes easier.

### Installation

Kings table is a npm porduct.

Open your favorite Terminal and run these commands from your working node.js directory

First Tab:
```sh
$ npm install kings.table
```

### Getting Started

You can query the timetable service with some added options for convinience. Syntax goes as such:

```
exports.getTimeTable('k-number', 'password', {
  format : 'json',
  start : '2018-11-12T00:00:00.000+00:00',
  end : '2018-11-19T00:00:00.000+00:00'
}, function(err, timetable){
    //Error detection and timetabling processing
    //Will be called after timetable gets downloaded
});
```

| Option | Options |
| ------ | ------ |
| format | 'json' or 'xml', timetable object will be in plain text for xml or a json of raw data |
| start | first date to retrive classes from (DATE format + hour)|
| end | last date to retrive classes from (DATE format + hour) |
| k-number | k number of account to retrieve from |
| password | password for k account |

### Parsing JSON Timetables

You can query and parse direclty, be sure to request the data in JSON format, we will not parse XML.

```
exports.getTimeTable('k-number', 'password', {
  format : 'json',
  start : '2018-11-12T00:00:00.000+00:00',
  end : '2018-11-19T00:00:00.000+00:00'
}, function(err, timetable){ //On callback, we call this function
  exports.parseTimeTableJson(timetable, function(err, timetableParsed){ //Call our parser with the timtable
    if(!err){
      console.log(timetableParsed.classes); //Display parsed classes
    }else{
      console.log(err.message); //Spit error, ugly I know lol
    }
  });
});
```

The parser can be called like this :

```
  exports.parseTimeTableJson(timetable, function(err, timetableParsed){ //Callback
    if(!err){
      console.log(timetableParsed.classes);
    }else{
      console.log(err.message);
    }
  });
```

The parser will output an object as such (if the data fed to it is correct). The final object will contain an array of all the modules. This is the .classes object of the parsed timetable.
```
[ { moduleName: '5CCS2ECM ELECTRICITY AND SEM1 000001/Lecture01/01',
    moduleDescription: 'Electricity and Magnetism',
    start: '2018-11-14T09:00:00.000+00:00',
    end: '2018-11-14T11:00:00.000+00:00',
    teacherName: 'Friderikos, Vasilis;Nakhai, Mohammad Reza;Shikh-Bahaei, Mohammad',
    locationID: '2B08 (130)',
    locationAddress: 'STRAND BLDG S-2.08' }]
```

#### Requesting XML timetables

If you are a legacy kinda guy or simple dont believe in my parser (which tbh, i do not trust it either) you can just get the raw unparsed xml data from the server. Enjoy trying to undersrtand the mess xx

```
exports.getTimeTable('k', 'password', {
  format : 'xml',
  start : '2018-11-12T00:00:00.000+00:00',
  end : '2018-11-19T00:00:00.000+00:00'
}, function(err, timetable){
    console.log(timetable);
});
```

### Todos

 - Write MORE Tests
 - Better exception and error catching lol
 - Less strict parsing rules.

License
----

MIT

