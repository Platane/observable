




describe("observer", function() {
  
	var observable;
	
	var fnCalled;

	var defaultParams={
		'eventName' : "mouseUp",
		'data' : {'key':'on'},
		'fn' : function(){fnCalled=true;},
		'ctx' : {'welcome':'home'},
	};
	var params;
	

	beforeEach( function(){
		// instanciate the object
		observable=new Observable();

		// reset the params object
		params={};
		for(p in defaultParams)
			params[p] = defaultParams[p];

		// reset the spy flag
		fnCalled=false;
	});
	describe(" on method", function() {
		describe(" arguments parsing", function() {

			

			describe(" ( eventName , data , function , context )", function() {	
				beforeEach( function(){
					observable.on( params.eventName , params.data , params.fn , params.ctx );
				});
				it(" should register properly in the listener store",function() {
					expect( observable._listeners ).not.toBeNull();
					expect( observable._listeners[ params.eventName ] ).not.toBeNull();
					expect( observable._listeners[ params.eventName ].length ).toEqual(1);

					expect( observable._listeners[ params.eventName ][0].fn ).toBe( params.fn );
					expect( observable._listeners[ params.eventName ][0].data[0] ).toEqual( params.data );
					expect( observable._listeners[ params.eventName ][0].ctx ).toBe( params.ctx );
					expect( observable._listeners[ params.eventName ][0].postfix ).toBe( "" );
				});
			});

			describe(" ( eventName ,  function , context )", function() {	
				beforeEach( function(){
					observable.on( params.eventName , params.fn , params.ctx );
					params.data=null;
				});
				it(" should register properly in the listener store",function() {
					expect( observable._listeners ).not.toBeNull();
					expect( observable._listeners[ params.eventName ] ).not.toBeNull();
					expect( observable._listeners[ params.eventName ].length ).toEqual(1);

					expect( observable._listeners[ params.eventName ][0].fn ).toBe( params.fn );
					expect( observable._listeners[ params.eventName ][0].data[0] ).toEqual( params.data );
					expect( observable._listeners[ params.eventName ][0].ctx ).toBe( params.ctx );
					expect( observable._listeners[ params.eventName ][0].postfix ).toBe( "" );
				});
			});

			describe(" ( eventName ,  function )", function() {	
				beforeEach( function(){
					observable.on( params.eventName , params.fn  );
					params.data=null;
					params.ctx=window;
				});
				it(" should register properly in the listener store",function() {
					expect( observable._listeners ).not.toBeNull();
					expect( observable._listeners[ params.eventName ] ).not.toBeNull();
					expect( observable._listeners[ params.eventName ].length ).toEqual(1);

					expect( observable._listeners[ params.eventName ][0].fn ).toBe( params.fn );
					expect( observable._listeners[ params.eventName ][0].data[0] ).toEqual( params.data );
					expect( observable._listeners[ params.eventName ][0].ctx ).toBe( params.ctx );
					expect( observable._listeners[ params.eventName ][0].postfix ).toBe( "" );
				});
			});

			describe(" ( eventName , data , function )", function() {	
				beforeEach( function(){
					observable.on( params.eventName , params.data ,  params.fn  );
					params.ctx=window;
				});
				it(" should register properly in the listener store",function() {
					expect( observable._listeners ).not.toBeNull();
					expect( observable._listeners[ params.eventName ] ).not.toBeNull();
					expect( observable._listeners[ params.eventName ].length ).toEqual(1);

					expect( observable._listeners[ params.eventName ][0].fn ).toBe( params.fn );
					expect( observable._listeners[ params.eventName ][0].data[0] ).toEqual( params.data );
					expect( observable._listeners[ params.eventName ][0].ctx ).toBe( params.ctx );
					expect( observable._listeners[ params.eventName ][0].postfix ).toBe( "" );
				});
			});


		});

		describe(" event name parsing", function() {

			describe(" with a postfix <eventName:label>", function() {	
				beforeEach( function(){
					observable.on( params.eventName+":mikey" ,  params.fn  );
				});
				it(" should register properly in the listener store",function() {
					expect( observable._listeners[ params.eventName ][0].postfix ).toBe( "mikey" );
				});

			});
		});


	});
	
	describe(" off method", function() {
		describe(" arguments parsing", function() {

			beforeEach( function(){
				observable.on( params.eventName , params.data , params.fn , params.ctx );
			});

			describe(" ( eventName , data , function , context )", function() {	
				beforeEach( function(){
					observable.off( params.eventName , params.data , params.fn , params.ctx );
					observable.trigger( params.eventName );
				});
				it(" should have deleted the listener",function() {
					expect( fnCalled ).toBe(false);
				});
			});

			describe(" ( eventName , data , function , context ) wrong eventName", function() {	
				beforeEach( function(){
					observable.off( params.eventName+"2" , params.data , params.fn , params.ctx );
					observable.trigger( params.eventName );
				});
				it(" should haven't deleted the listener",function() {
					expect( fnCalled ).toBe(true);
				});
			});

			describe(" ( eventName , data , function , context ) wrong data", function() {	
				beforeEach( function(){
					observable.off( params.eventName , {} , params.fn , params.ctx );
					observable.trigger( params.eventName );
				});
				it(" should haven't deleted the listener",function() {
					expect( fnCalled ).toBe(true);
				});
			});

			describe(" ( eventName , data , function , context ) wrong fn", function() {	
				beforeEach( function(){
					observable.off( params.eventName , params.data , function(){} , params.ctx );
					observable.trigger( params.eventName );
				});
				it(" should haven't deleted the listener",function() {
					expect( fnCalled ).toBe(true);
				});
			});
			
			describe(" ( eventName , data , function , context ) wrong context", function() {	
				beforeEach( function(){
					observable.off( params.eventName , params.data , params.fn , {} );
					observable.trigger( params.eventName );
				});
				it(" should haven't deleted the listener",function() {
					expect( fnCalled ).toBe(true);
				});
			});

			describe(" ( eventName , data , function )", function() {	
				beforeEach( function(){
					observable.off( params.eventName , params.data , params.fn );
					observable.trigger( params.eventName );
				});
				it(" should haven't deleted the listener",function() {
					expect( fnCalled ).toBe(false);
				});
			});

			describe(" ( eventName , data , context )", function() {	
				beforeEach( function(){
					observable.off( params.eventName , params.data , params.ctx );
					observable.trigger( params.eventName );
				});
				it(" should haven't deleted the listener",function() {
					expect( fnCalled ).toBe(false);
				});
			});

			describe(" ( eventName , function , context )", function() {	
				beforeEach( function(){
					observable.off( params.eventName , params.fn , params.ctx );
					observable.trigger( params.eventName );
				});
				it(" should have deleted the listener",function() {
					expect( fnCalled ).toBe(false);
				});
			});

			describe(" ( eventName , function )", function() {	
				beforeEach( function(){
					observable.off( params.eventName , params.fn );
					observable.trigger( params.eventName );
				});
				it(" should have deleted the listener",function() {
					expect( fnCalled ).toBe(false);
				});
			});

			describe(" ( eventName , context )", function() {	
				beforeEach( function(){
					observable.off( params.eventName , params.ctx );
					observable.trigger( params.eventName );
				});
				it(" should have deleted the listener",function() {
					expect( fnCalled ).toBe(false);
				});
			});

			describe(" ( eventName )", function() {	
				beforeEach( function(){
					observable.off( params.eventName , params.fn );
					observable.trigger( params.eventName );
				});
				it(" should have deleted the listener",function() {
					expect( fnCalled ).toBe(false);
				});
			});

			describe(" ( context )", function() {	
				beforeEach( function(){
					observable.off( params.ctx );
					observable.trigger( params.eventName );
				});
				it(" should have deleted the listener",function() {
					expect( fnCalled ).toBe(false);
				});
			});

			describe(" ( context ) wrong context", function() {	
				beforeEach( function(){
					observable.off( {} );
					observable.trigger( params.eventName );
				});
				it(" should have deleted the listener",function() {
					expect( fnCalled ).toBe(true);
				});
			});
			
			describe(" (  )", function() {	
				beforeEach( function(){
					observable.off(  );
					observable.trigger( params.eventName );
				});
				it(" should have deleted the listener",function() {
					expect( fnCalled ).toBe(false);
				});
			});

			

		});
	
		describe(" event name parsing", function() {
			beforeEach( function(){
				observable.on( params.eventName+":mikey" , params.data , params.fn , params.ctx );
			});
			describe(" call off without the postfix", function() {	
				beforeEach( function(){
					observable.off( params.eventName  );
					observable.trigger( params.eventName );
				});
				it(" should have deleted the listener",function() {
					expect( fnCalled ).toBe(false);
				});
			});

			describe(" call off with the postfix", function() {	
				beforeEach( function(){
					observable.off( params.eventName+":mikey"  );
					observable.trigger( params.eventName );
				});
				it(" should have deleted the listener",function() {
					expect( fnCalled ).toBe(false);
				});
			});

			describe(" call off with the postfix", function() {	
				beforeEach( function(){
					observable.on( params.eventName+":mike" , params.data , params.fn , params.ctx );
					observable.off( params.eventName+":mikey"  );
					observable.trigger( params.eventName );
				});
				it(" should haven't deleted the listener with another postfix",function() {
					expect( fnCalled ).toBe(true);
				});
			});

		});
	});
});




