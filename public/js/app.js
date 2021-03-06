console.log('client side file is loaded')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#line1')
const msg2 = document.querySelector('#line2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const locate = search.value
    
    msg1.textContent = 'loading...'
    msg2.textContent = ''

    fetch(`http://localhost:3000/weather?address=${locate}`).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            msg1.textContent = data.error
        }else{
            msg1.textContent = data.forecast
            msg2.textContent = data.location
        }
        
        })
})
})

