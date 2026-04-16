var currentQuestion = 0;
var scores = {
    shooting: 0,
    height: 0,
    hops: 0,
    speed: 0,
    handles: 0,
    defense: 0
};
var questions = [];
var players = [];

fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        for (var i = data.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = data[i];
            data[i] = data[j];
            data[j] = temp;
        }
        questions = data;
        return fetch('players.json');
    })
    .then(response => response.json())
    .then(data => {
        players = data;
        showQuestion();
    });

function showQuestion() {
    var q = questions[currentQuestion];
    $('question-text').textContent = q.question;
    $('progress-text').textContent = (currentQuestion + 1) + ' / ' + questions.length;
    $('progress-bar').style.width = ((currentQuestion + 1) / questions.length * 100) + '%';
    
    var answersDiv = $('answers');
    answersDiv.innerHTML = '';
    
    q.answers.forEach((answer, index) => {
        var btn = document.createElement('button');
        btn.className = 'bbti-answer-btn';
        btn.textContent = answer;
        btn.onclick = () => selectAnswer(index);
        answersDiv.appendChild(btn);
    });
}

function selectAnswer(answerIndex) {
    var dimension = questions[currentQuestion].dimension;
    scores[dimension] += (questions[currentQuestion].answers.length - answerIndex - 1);
    
    currentQuestion++;
    
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    for (var dim in scores) {
        scores[dim]++;
        scores[dim] = Math.min(scores[dim], 10);
    }

    $('quiz').style.display = 'none';
    $('result').style.display = 'block';
    
    var dimensionNames = {
        shooting: 'Shooting',
        height: 'Height',
        hops: 'Hops',
        speed: 'Speed',
        handles: 'Handles',
        defense: 'Defense'
    };
    
    var userScores = [
        scores.shooting,
        scores.height,
        scores.hops,
        scores.speed,
        scores.handles,
        scores.defense
    ];
    
    function cosineSimilarity(vec1, vec2) {
        var dotProduct = 0;
        var norm1 = 0;
        var norm2 = 0;
        for (var i = 0; i < vec1.length; i++) {
            dotProduct += vec1[i] * vec2[i];
            norm1 += vec1[i] * vec1[i];
            norm2 += vec2[i] * vec2[i];
        }
        return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
    }
    
    var bestMatch = null;
    var bestSimilarity = -1;
    
    players.forEach(player => {
        var similarity = cosineSimilarity(userScores, player.stats);
        if (similarity > bestSimilarity) {
            bestSimilarity = similarity;
            bestMatch = player;
        }
    });
    
    var type = bestMatch ? bestMatch.name : 'Unknown';
    var playerFeatures = bestMatch ? bestMatch.features : '';
    var playerRealName = bestMatch ? bestMatch.realName : '';
    
    $('result-type').textContent = type;
    $('result-desc').innerHTML = `<p class="bbti-real-name">${bestMatch.name} (${playerRealName})</p><p class="bbti-features">${playerFeatures}</p>`
    + '<table><tr><th>维度</th><th>含义（仅供参考）</th></tr><tr><td>Shooting</td><td>精准度与目标感</td></tr><tr><td>Height</td><td>视野与格局</td></tr><tr><td>Hops</td><td>爆发力与勇气</td></tr><tr><td>Speed</td><td>反应力与行动力</td></tr><tr><td>Handles</td><td>掌控力与应变力</td></tr><tr><td>Defense</td><td>责任感与守护意识</td></tr></table>';
    
    var scoresHtml = '';
    Object.entries(scores).forEach(([dim, score]) => {
        scoresHtml += '<div class="bbti-score-item"><span>' + dimensionNames[dim] + '</span><span>' + score + '</span></div>';
    });
    $('result-scores').innerHTML = scoresHtml;
    
    $('restart-btn').onclick = () => {
        currentQuestion = 0;
        scores = {
            shooting: 0,
            height: 0,
            hops: 0,
            speed: 0,
            handles: 0,
            defense: 0
        };
        $('result').style.display = 'none';
        $('quiz').style.display = 'block';
        showQuestion();
    };
}
