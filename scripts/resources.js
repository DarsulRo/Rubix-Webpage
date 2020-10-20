function dropSection(event){
    event.target.classList.toggle('droppedArrow')
    event.target.parentElement.nextElementSibling.classList.toggle('showContent')
}