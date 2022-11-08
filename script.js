// suivre l'évolution de la page
const ratio=.6
const spies=document.querySelectorAll('[data-spy]')

let observer=null
/**
 * 
 * @param {HTMLElement} elem 
 */

const activate=function(elem){
    const id=elem.getAttribute('id')
    const anchor=document.querySelector(`a[href="#${id}"]`)
    if(anchor===null){
        return null
    }
    anchor.parentElement.querySelectorAll('.active').forEach(node => node.classList.remove('active'))
    anchor.classList.add('active')
}
/**
 * 
 * @param {IntersectionOberser[]} entries 
 * @param {IntersectionObserver} observer 
 */

const callback=function(entries){
    entries.forEach(function(entry){
        if(entry.isIntersecting){
            activate(entry.target) 
        }
    })
}
/**
 * 
 * @param {NodeListOf.<Element>} elems 
 */
const observe=function(elems){
    if(observer !== null){
        elems.forEach(elem => observer.unobserve(elem))
    }
    const y=Math.round(window.innerHeight * ratio)
    observer=new IntersectionObserver(callback,{
        rootMargin:`-${window.innerHeight -y -1}px 0px -${y}px 0px`
    })
    elems.forEach(function(elem){
        observer.observe(elem) 
    })
}
if(spies.length>0){
    observe(spies)
    window.addEventListener('resize', function(){
        observe(spies)
    })
}