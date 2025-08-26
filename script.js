const checkbtn = document.getElementById('checkbtn')
      const questionEl = document.querySelector('.question')
      const optionsEls = document.querySelectorAll('.opt')
      const score = document.getElementById('score')
      const nextbtn = document.getElementById('btn')
      const footer = document.querySelector('.footer')
      let timer;

      const quizData = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Preprocessor",
      "Hyper Text Markup Language",
      "Hyper Tool Multi Language",
      "Hyperlinks and Text Markup Language"
    ],
    answer: 1
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Cascading Style Sheets",
      "Creative Style System",
      "Control Style Syntax"
    ],
    answer: 1
  },
  {
    question: "Which HTML tag is used to define an internal stylesheet?",
    options: [
      "<css>",
      "<script>",
      "<style>",
      "<link>"
    ],
    answer: 2
  },
  {
    question: "Which property is used in CSS to change the text color?",
    options: [
      "font-color",
      "text-style",
      "color",
      "background-color"
    ],
    answer: 2
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    options: [
      "<js>",
      "<javascript>",
      "<scripting>",
      "<script>"
    ],
    answer: 3
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    options: [
      "//",
      "/* */",
      "<!-- -->",
      "#"
    ],
    answer: 0
  },
  {
    question: "Which company developed JavaScript?",
    options: [
      "Microsoft",
      "Netscape",
      "Sun Microsystems",
      "Oracle"
    ],
    answer: 1
  },
  {
    question: "Which HTML attribute is used to define inline styles?",
    options: [
      "style",
      "styles",
      "font",
      "class"
    ],
    answer: 0
  },
  {
    question: "Which CSS property controls the size of text?",
    options: [
      "font-size",
      "text-size",
      "font-style",
      "text-style"
    ],
    answer: 0
  },
  {
    question: "How do you write 'Hello World' in an alert box in JavaScript?",
    options: [
      "alert('Hello World');",
      "msg('Hello World');",
      "msgBox('Hello World');",
      "alertBox('Hello World');"
    ],
    answer: 0
  }
]



  let index = 0
  let scoreval = 0 

    function loadQuestion(){
      var q = quizData[index]
      questionEl.textContent = q.question

      for(var i=0; i<optionsEls.length; i++){
        optionsEls[i].textContent = q.options[i]
      }
      nextbtn.disabled = true
      checkbtn.disabled = true

      optionsEls.forEach(function(opt){
        opt.classList.remove('correct', 'selected', 'wrong')
      })

      clearInterval(timer)
      startTimer()
      
    }
    loadQuestion()

    optionsEls.forEach(function(opt){
      opt.addEventListener('click', function(){
        optionsEls.forEach(function(o){
          o.classList.remove('selected')
        })

        this.classList.add('selected')
        checkbtn.disabled = false
        
        

      })
    })

    

    

    function nextQuestion(){
      index++
      optionsEls.forEach(function(opt){
        opt.style.pointerEvents = 'auto'
      })
      if(index< quizData.length){
        loadQuestion()
      }
      else{
        questionEl.textContent = 'QUIZ FINISHED!'
        optionsEls.forEach(function(opt){
          opt.style.display = 'none'
        })
        document.querySelector('.btn').style.display = 'none'
        document.querySelector('#btn').style.display = 'none'  
        const reset = document.createElement('button')
        reset.id = 'reset'
        reset.classList.add('btn') 
        reset.textContent = 'Reset Quiz'
        footer.appendChild(reset)
        reset.addEventListener('click', resetQuiz) 
        document.querySelector('.timer').innerHTML = ''  
      }
    }

    function checkAnswer(){
      clearInterval(timer)
      var selectedOption = null
      optionsEls.forEach(function(opt, i){
        if(opt.classList.contains('selected')){
          selectedOption = i
        }
      })
      if(selectedOption === null){
        alert("try selecting an option!")
        return
      }
      if(selectedOption == quizData[index].answer){
        scoreval++
        score.textContent = `Score: ${scoreval}`
        optionsEls[selectedOption].classList.remove('selected')
        optionsEls[selectedOption].classList.add('correct')
      } else{
        optionsEls[selectedOption].classList.remove('selected')
        optionsEls[selectedOption].classList.add('wrong')
        optionsEls[quizData[index].answer].classList.add('correct')
      }

      optionsEls.forEach(function(opt){
        opt.style.pointerEvents = 'none'
      })


      nextbtn.disabled = false
      checkbtn.disabled = true
    }

    function resetQuiz(){
      index = 0
      scoreval = 0
      score.textContent = `Score: ${scoreval}`

      nextbtn.style.display = 'inline-block'
      checkbtn.style.display = 'inline-block'

      let resetbtn = document.getElementById('reset')
      optionsEls.forEach(function(opt){
        opt.style.display = 'inline-block'
      })
      if(resetbtn){
        resetbtn.remove()
      }


      loadQuestion()
    }

    function startTimer(){
      var timeLeft = 10
      document.querySelector('.timer').textContent = `Time Left: ${timeLeft}`

      timer = setInterval(function(){
        timeLeft--
        document.querySelector('.timer').textContent = `Time Left: ${timeLeft}`

        if(timeLeft <= 0){
          clearInterval(timer)
          nextQuestion()
        }
      },1000)
    }


    checkbtn.addEventListener('click', checkAnswer)
    nextbtn.addEventListener('click', nextQuestion)
    
    
    
    

