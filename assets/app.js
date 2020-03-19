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
				`" type="button" class="suggestion-button btn btn-outline-success">
                    
                ` +
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
			`http://api.giphy.com/v1/gifs/search?q=${queryString}&api_key=daUVhRpYIvscQp9r7t2QhlleMB4MXTOR&limit=12&offset=${offset}`,
			{
				type: 'GET'
				// data: data
			}
		)
			.then(function(res) {
				let response = res.data;

				for (let i = 0; i < response.length; i++) {
					let gifContainer = $('.gifs-container');

					let gifData = response[i];

					let gifCard = $(
						`
                    <div class="card style="">
                        <img class="card-img-top" src="${gifData.images.fixed_height_still.url}" alt="Card image cap">
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
});
