// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
PokemonApp.PokemonComponent = class {
	constructor(pokemonUri) {
		this.id = PokemonApp.idFromUri( pokemonUri );
	}

	render () {
		console.log(`PokemonComponent rendering pokemon #${this.id}`);

		$.ajax({
			type: "GET",
			url: `/api/v1/pokemon/${this.id}`,
			success: PokemonApp.showPokemonModal,
			error: PokemonApp.handleError
		})
	}

	renderImg () {
		console.log("Add the image");

		$.ajax({
			type: "GET",
			url: `/api/v1/sprite/${this.id}/`,
			success: PokemonApp.showImg,
			error: PokemonApp.handleError
		})
	}


};

PokemonApp.showPokemonModal = function(result) {
	// console.log(result);
	$(".js-poke-name").html(result.name);
	$(".js-poke-number").html(`#${result.pkdx_id}`);
	$(".js-poke-height").html(result.height)
	$(".js-poke-weight").html(result.weight)
	$(".js-poke-hp").html(result.hp)
	$(".js-poke-attack").html(result.attack)
	$(".js-poke-defense").html(result.defense)
	$(".js-poke-sp-attack").html(result.sp_atk)
	$(".js-poke-sp-defense").html(result.sp_def)
	$(".js-poke-sp-speed").html(result.speed)

	result.types.forEach(function(theType){
		$(".js-poke-types").append(theType.name + " ")
	})

	$(".js-pokemon-modal").modal("show");
};

PokemonApp.showImg = function (result) {
	console.log(result)
	var imgInteger = result.id - 1
	$(".js-poke-img").html(`<img src='/assets/pokemon/${imgInteger}.png'>`)
}

PokemonApp.handleError = function(theError) {
	console.log("Pokemon Component Error")
	console.log(theError.responseText)
}

// Input: "v1/pokemon/57"
// Output: "57"

PokemonApp.idFromUri = function (pokemonUri) {
	var uriSegments = pokemonUri.split("/");
	var secondLast = uriSegments.length - 2;
	return uriSegments[secondLast];

};

$(document).ready(function (){
	$(".js-show-pokemon").on("click", function (theEvent){

		// data-pokemon-uri="api/v1/pokemon/57/"
		var theUri = $(theEvent.currentTarget).data("pokemon-uri");
		console.log( theUri );

		var pokeComponent = new PokemonApp.PokemonComponent( theUri );
		pokeComponent.render();
		pokeComponent.renderImg();
	});


});