const inputValue: HTMLInputElement | null = document.getElementById('input-name') as HTMLInputElement;
const searchBtn: HTMLElement | null = document.getElementById('search-button');
const containerCharacter: HTMLElement | null = document.getElementById('container-character');
const imgCharacter: HTMLImageElement | null = document.getElementById('img-character') as HTMLImageElement;

async function fetchF(value: string): Promise<any> {
    const result = await fetch(`https://rickandmortyapi.com/api/character/${value}`)
        .then((res) => res.json());

    return result;
}

const filterData = (result: any): any => {
    const divFilter = document.getElementsByClassName('filter');
    const filterArray = Array.from(divFilter) as HTMLDivElement[];

    const filteredObject: any = {};

    filterArray
        .map((element) => document.getElementById((element.lastElementChild as HTMLElement)?.id || ''))
        .map((element) => {
            if (element && (element as HTMLInputElement).checked) {
                filteredObject[(element as HTMLInputElement).name] = result[(element as HTMLInputElement).name];
            }
        });

    if (Object.keys(filteredObject).length === 0) {
        return result;
    } else {
        return filteredObject;
    }
};

searchBtn?.addEventListener('click', async () => {
    if (inputValue) {
        const result = await fetchF(inputValue.value);

        if (imgCharacter) {
            imgCharacter.setAttribute('src', result.image);
        }

        if (containerCharacter) {
            containerCharacter.innerText = JSON.stringify(filterData(result), undefined, 1);
        }
    }
});
