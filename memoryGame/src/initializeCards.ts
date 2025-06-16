   //randomize cards
export function initializeCards(){
    const cards = []
    for(let i = 1; i <= 18; i++){
        cards.push(i);
    }
    return cards.sort(()=>  Math.random() - 0.5)
}