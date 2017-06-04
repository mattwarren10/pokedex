if (window.PokemonApp === undefined) {
	window.PokemonApp = {};
}

PokemonApp.init = function () {
	//3rd party setup code here
};

$(document).on("ready", function(){
	PokemonApp.init();
})