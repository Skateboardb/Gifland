const suggestions = [
	'Naruto',
	'Bleach',
	'One Piece',
	'Attack on Titan',
	'Pokémon',
	'Avatar: The Last Airbender',
	'Sword Art Online',
	'Assassination Classroom'
];

$(function() {
	let queryString;
	let offset = 0;

	// Append suggestion buttons
	for (let i = 0; i < suggestions.length; i++) {
		console.log(suggestions[i]);
		$('#suggestions-container').append(
			`<button data-name="` +
				suggestions[i].replace(/\s/g, '+') +
				`" type="button" class="suggestion-button btn btn-outline-success">` +
				suggestions[i] +
				`</button>`
		);
	}

	// Button handlers
	$('#search-bar').on('submit', event => {
		event.preventDefault();
		queryString = $('#search-field')
			.val()
			.replace(/\s/g, '+');
		$('.gifs-container').empty();
		giphySearch(queryString);
		offset = 0;
	});

	$('.suggestion-button').on('click', function(event) {
		event.preventDefault();
		queryString = $(this).attr('data-name');
		$('.gifs-container').empty();
		giphySearch(queryString);
		offset = 0;
	});

	$('#moar-btn').on('click', () => {
		giphySearch(queryString);
	});

	// Gif search
	function giphySearch(queryString) {
		$.ajax(
			`https://api.giphy.com/v1/gifs/search?q=${queryString}&api_key=daUVhRpYIvscQp9r7t2QhlleMB4MXTOR&limit=12&offset=${offset}`,
			{
				type: 'GET'
			}
		)
			.then(function(res) {
				let response = res.data;

				for (let i = 0; i < response.length; i++) {
					let gifContainer = $('.gifs-container');
					let gifData = response[i];
					let stillSrc = gifData.images.fixed_height_still.url;
					let animSrc = gifData.images.fixed_height.url;
					let gifCard = $(
						`
                    <div class="card col-10-sm">
                        <img class="card-img-top giphy-gif" data-on=false data-still="${stillSrc}" data-animate="${animSrc}" src="${gifData.images.fixed_height_still.url}" alt="Card image cap">

                        <div class="card-body">
                            <h5 class="gif-rating">Rating: 
                            ${gifData.rating} </h5>
                        </div>
                    </div>`
					);

					offset++;
					gifContainer.append(gifCard);
				}
			})
			.done(() => {
				$('#moar-btn').removeClass('hide');
			});
	}

	// Animate-Inanimate

	$('.gifs-container').on('click', 'img', function(event) {
		event.preventDefault();

		let on = $(this).attr('data-on');
		const stillSrc = $(this).attr('data-still');
		const animSrc = $(this).attr('data-animate');

		on == 'false'
			? $(this).attr('data-on', true) && $(this).attr('src', animSrc)
			: $(this).attr('data-on', false) && $(this).attr('src', stillSrc);
	});
});
