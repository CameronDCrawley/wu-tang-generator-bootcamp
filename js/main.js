document.querySelector('#wuBtn').addEventListener('click', wuName)

function wuName(){

  //const userInput = document.querySelector('#userInput').value;
  const questions = ["q1","q2","q3","q4","q5"]
  const answers = questions.map(function(question){
    //using the name instead of the index to grab only the ones checked
    const picked = document.querySelector(`input[name = "${question}"]:checked`)
    return picked ? picked.value: ''
  })
  
    if(answers.includes('')){
      document.querySelector('#announce').textContent = 'Cash Rules Everything Around Me!!!!'
      return
    }

    const query = questions
    .map(function(question,index){
      return question + '=' + answers[index];
    })
      .join('&')
      fetch('/api?' + query)
      .then(function(response){
        return response.json()
      })
      .then(function(data){
        document.querySelector('#announce').textContent =  `Your name is `+ data.name
      })
}

