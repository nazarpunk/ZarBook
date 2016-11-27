//sidebar scrollbar
$('#sidebar > .scrollbar').scrollbar();

//book import
$('#bookImportFormInputFile').change(function(){
	$('#bookImportFormInputText').val($(this).val());
});

$("#bookImportForm").submit(function(e) {
	e.preventDefault();
});









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
  

function isLocalStorageAvailable() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}


var localStorageSpace = function(){
        var allStrings = '';
        for(var key in window.localStorage){
            if(window.localStorage.hasOwnProperty(key)){
                allStrings += window.localStorage[key];
            }
        }
        return allStrings ? 3 + ((allStrings.length*16)/(8*1024)) + ' KB' : 'Empty (0 KB)';
    };

 
