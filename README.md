observable
========

Simple abstract solution for observable pattern


##Usage


Attach the methods on / off / trigger on your observable object.
Feel free to use some inheritance mechanism. No need to initialize the private fields.

Basically use on to attach a function to callback when the trigger method is called. Use off to remove the listener.

####parameters

The on method support the following syntax

``` 
observable.on( event [, data ] , function [, context ] ); 
``` 

 * **event** if a string, it can have a postfix, separated with ":" *( for example "change:title" )*.
 * **data** can be anything but a function, it will be added to the callback arguments.
 * **function** is the callback function 
 * **context** is the context of the callback function 

The off method support the same syntax.

It additionnaly accepts theses too :

``` 
 observable.off( event );    // remove the events related to the event name 
 observable.off( context );  // remove the events related to the context 
 observable.off(  ); 	     // remove all the events
```

####postfix
  Event with a postfix will be triggered as well as one without. 
  
 >  `"change:title"` will be trigger by `trigger("change")`
 
  They are remove as well as the one without 
  
 > `off( "change" )` will also remove the `"change:title"` events, but `off("change:title")` will off course only remove this specific event
