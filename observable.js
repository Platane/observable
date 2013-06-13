/**
 * @author platane / http://arthur-brongniart.fr/
 */
var Observable=function(){};
Observable.prototype={

	_listeners:null,

	stack:null,

	lock:null,
	
	// ( event , fn )
	// ( event , data , fn )
	// ( event , fn  , context )
	// ( event , data , fn  , context )
	on:function( eventName , data , fn , context ){

		//do it latter if locked
		if(this.lock){
			this.stack.push({ 'fn':'on' , 'arguments':arguments });
			return;
		}

		// deal with params
		if( typeof(data) == "function" ){
			context=fn;
			fn=data;
			data=null;
		}

		// if needed instanciate the _listeners store
		if(!this._listeners)
			this._listeners={};

		// check for prefix
		var re=eventName.match("^([^:]*)(:(.*))?$");
		var eventPrefix=re[1];
		var eventPostfix=re[3]||"";

		// if needed instanciate the _listeners list
		if(!this._listeners[eventPrefix])
			this._listeners[eventPrefix]=[];

		// push the item
		this._listeners[eventPrefix].push({
			fn : fn,
			ctx : !context ? window : context,
			postfix : eventPostfix,
			data : !data ? [] : [data] ,
		});
	},

	// (  )
	// ( event )
	// ( context ) 
	// ( event , fn )
	// ( event , context )
	// ( event , data , fn )
	// ( event , data , context )
	// ( event , fn  , context )
	// ( event , data , fn  , context )
	off:function( eventName , data , fn , context ){
		
		//do it latter if locked
		if(this.lock){
			this.stack.push({ 'fn':'off' , 'arguments':arguments });
			return;
		}

		// deal with params
		switch(arguments.length){
			case 0:
				context=null;
				fn=null;
				data=null;
				eventName=null;
			break;

			case 1:
				if(typeof(eventName)=="string"){
					context=null;
				}else{
					context=arguments[0];
					eventName=0;
				}
				fn=null;
				data=null;
			break;

			case 2:
				if( typeof(arguments[1])=="function" ){
					context=null;
					fn=arguments[1];
					data=null;
				}else{
					context=arguments[1];
					data=null;
					fn=null;
				}
			case 3:
				if( typeof(data)=="function" ){
					context=fn;
					fn=data;
					data=null;
				}
				if( typeof(fn)!="function"){
					context=fn;
					fn=null;
				}
			break;
		}

		// if needed instanciate the _listeners store
		if(!this._listeners)
			return;


		// iterate throught some entry of the store, defined in lists
		var lists;
		if(!eventName){
			// if no eventName is given, iterate throught all the store
			lists=[];
			for(var name in this._listeners)
				lists.push(name);
		}else{
			// else split at every space
			lists=eventName.split(" ");
		}

		var j=lists.length;
		while(j--){

			// check for prefix
			var re=lists[j].match("^([^:]*)(:(.*))?$");
			var eventPrefix=re[1];
			var eventPostfix=re[3]||"";

			// if needed instanciate the _listeners list
			if(!this._listeners[eventPrefix])
				return;


			// iterate throught the list and delete item if they match the passing args
			var l=this._listeners[eventPrefix]; // alias

			var i=l.length;
			while(i--)
				if(
						( eventPostfix == "" || l[i].postfix == eventPostfix )
					&&	( !fn || l[i].fn == fn )
					&&	( !context || l[i].ctx == context )
					&&	( !data || ( l[i].data.length>0 && l[i].data[0] == data ) )
				)
					l.splice(i,1);
		}
	},

	// ( event )
	// ( event , data )
	trigger:function( eventName , data ){

		// check for prefix
		var re=eventName.match("^([^:]*)(:(.*))?$");
		var eventPrefix=re[1];
		var eventPostfix=re[3]||"";

		if(!this._listeners || !this._listeners[eventPrefix] )
			return;

		var l=this._listeners[eventPrefix];

		// relegate the on and off to later
		this.lock=true;

		var i=l.length;
		while(i--)
			if( eventPostfix == "" || l[i].postfix == eventPostfix )
				l[i].fn.apply(
					l[i].ctx,
					l[i].data.concat( data || [] )
				);

		// do the on and off that occur during the calls
		this.lock=false;

		this.stack=[];
		var i=this.stack.length;
		while(i--)
			this[ this.stack[i].fn ].appy( this , this.stack[i].arguments );

		if( (debug=true) ){
			console.log( {
				"event" : eventName ,
				"_listeners" : this._listeners[eventPrefix] ,
				"data" : data  });
		}
	},
};