async function sendRequest(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Something went wrong with request');
    }

    const data = await response.json();

    if (data.length === 0) {
      throw new Error('Data is empty');
    }
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}


async function renderData() {
	const inner = document.querySelector('.showcase__inner');

  const data = await sendRequest(
    'https://rickandmortyapi.com/api/character/[1,2,3,4,11]'
  );

  for (let i = 0; i < data.length; i++) {
		const card = document.createElement('article');
    
		card.className = 'character-card';
		card.innerHTML = createElement(data[i]);

    inner.insertAdjacentElement('beforeend', card)
  }
}

function createElement({ image, name, status, species, origin }) {
	return `
	<div class="character-card__image"><img src=${image} alt="${name}" aria-label=${name} /></div>
  <div class="character-card__content-wrapper">
      <div class="character-card__row">
          <h2>${name}</h2>
          <span><span class="${status.toLowerCase()}"></span>${status} - ${species}</span>
      </div>
      <div class="character-card__row">
          <span class="text-grey">First seen in:</span>
          <span class="character-card__location">${origin.name}</span>
      </div>
  </div>
	`
}

export default renderData;

