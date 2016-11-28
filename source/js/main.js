'use strict';

window.zar = {
	//localstorage
	ls : {
		isAvailable : function() {
	    	try {
	        	return 'localStorage' in window && window['localStorage'] !== null;
	    	} catch (e) {
	        	return false;
	    	}
		},
		spaceMax : function(){
			return 3000;
		},
		spaceUsed : function(){
        	var allStrings = '';
        	for(var key in window.localStorage)
            	if(window.localStorage.hasOwnProperty(key))
                	allStrings += window.localStorage[key];
        	return allStrings ? 3 + ((allStrings.length*16)/(8*1024)):0;
    	},
    	spaceFree : function(){
    		var zar = window.zar;
    		
    		return zar.ls.spaceMax()-zar.ls.spaceUsed();
    	},
    	isQuotaExceeded : function(e) {
			var quotaExceeded = false;
			if (e) {
				if (e.code) {
					switch (e.code) {
						case 22:
							quotaExceeded = true;
							break;
						case 1014:
						// Firefox
						if (e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
							quotaExceeded = true;
						}
						break;
					}
				} else if (e.number === -2147024882) {
					// Internet Explorer 8
					quotaExceeded = true;
				}
			}
			return quotaExceeded;
		},
		save: function(k,v){
			try {
				localStorage.setItem(k, v);
			} catch(e) {
				if (window.zar.ls.isQuotaExceeded(e))
					alert('Локальное хранилище заполнено');
				return false;
			}
			return true;
		},
		log: function(){
			var obj = {};
			for (var i = 0; i < localStorage.length; i++) {
				obj[localStorage.key(i)] = localStorage.getItem(localStorage.key(i)); 
			}
			console.log('localStorage',obj);		
		}

	},
	//editor
	editor : {
		show: function(){
			var zar = window.zar;
			zar.elem.canvas.show();
			zar.elem.sidebar.show();
			zar.elem.wrapStart.hide();
			zar.elem.bookNodeAddNavForm.show();
		},
		hide: function(){
			var zar = window.zar;
			zar.elem.canvas.hide();
			zar.elem.sidebar.hide();
			zar.elem.wrapStart.show();
			zar.elem.bookNodeAddNavForm.hide();
		},
		booksGet: function(){
			var books = localStorage.getItem('zarbook_books');
			if (books===null) return [];
			
			try { var arr = JSON.parse(books);}
			catch (e){return false;}

			
			if ((typeof arr == "object") && (arr instanceof Array))
				return arr;
			
			return false; 
		},
		booksSave: function(arr){
			var zar = window.zar;
			var str = JSON.stringify(arr);
			if(zar.ls.save('zarbook_books',str)===false) alert('bookSave');;
		},
		
		bookNew: function(str){
			var zar = window.zar;
			var editor = zar.editor;
			//book name
			var name = $.trim(str) || 'Моя книга-игра';
			if (name=='') name = 'Моя книга-игра';
			//books get
			var books = editor.booksGet();
			if (books===false) {
				alert('Ошибка получения книг-игр');
				return;
			}
			//books number
			var bookNum = 0;
			while (true){
				bookNum++;
				if (books.indexOf(bookNum)==-1) break;
			}
			//books save
			books.push(bookNum);
			books.sort(function(a,b){return a-b;});
			editor.booksSave(books);
		
			if (zar.ls.save('zarbook_book'+bookNum+'_name',name)===false) alert('bookNew save');
			
			zar.ls.log();
			
		}
	}
	
	
};
//elem
window.zar.elem = {
	wrapStart : $('#wrapStart'),
	sidebar : $('#sidebar'),
	sidebarScrollbar: $('#sidebar > .scrollbar').scrollbar(),
	bookNewForm : $("#bookNewForm").submit(function(e){
		var zar = window.zar;
		e.preventDefault();
		var val = $('#bookNewFormInput').val();
		zar.editor.bookNew(val);
		
		zar.editor.show();
		
	}),
	bookImportForm : $("#bookImportForm").submit(function(e) {
		var zar = window.zar;
		e.preventDefault();
		console.log(zar.ls.isAvailable());
	}),
	bookImportFormInputFile : $('#bookImportFormInputFile').change(function(){
		$('#bookImportFormInputText').val($(this).val());
	}),
	bookNodeAddNavForm : $('#bookNodeAddNavForm'),
	canvas : $('#canvas'),
	navbarBrandLink: $('.navbar-brand').bind('click',function(e){
		var zar = window.zar;
		zar.editor.hide();
	})
};


var t = {
	//booklist
	zarbook_books: [1,2,3,4,5,6],
	//book name
	zarbook_book_1_name: 'Моя супер книжка',
	//nodelist
	zarbook_book_1_nodes: [0,3,4,6,7],
	
	//booknodes
	zarbook_book_1_nodeText_1: '',
	zarbook_book_1_nodeComment_1: '',
	
	zarbook_book_1_nodeComment_1: '',
	
	
	//nodelink
	
	
	
	//edge
	//zarbook_book_1
};




// create an array with nodes
  var nodes = new vis.DataSet([
    {id: 1, label: 'Node 1'},
    {id: 2, label: 'Node 2'},
    {id: 3, label: 'Node 3'},
    {id: 4, label: 'Node 4'},
    {id: 5, label: 'Node 5'}
  ]);

  // create an array with edges
  var edges = new vis.DataSet([
    {from: 1, to: 3},
    {from: 1, to: 2},
    {from: 2, to: 4},
    {from: 2, to: 5}
  ]);

  // create a network
  var container = document.getElementById('canvas');
  var data = {
    nodes: nodes,
    edges: edges
  };
  var options = {
  	interaction: {
          navigationButtons: true,
          keyboard: true,
          hover:true
        }
  	
  };
  var network = new vis.Network(container, data, options);

