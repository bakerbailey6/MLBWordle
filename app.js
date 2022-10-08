new Vue({
    el: '#app',
    data () {
      return {
        player: ['mike trout', 'mookie betts', 'clayton kershaw', 'ronald acuna jr.', 'aaron judge', 'jose altuve', 'bryce harper', 'wander franco', 'byron buxton', 'lance lynn', 'corey seager', 'joc pederson', 'max scherzer', 'luis castillo', 'nolan arenado'],
        league: {
          'NL': {
            'NL_west': {
              'LAD': 'los angeles dodgers',
              'SD': 'san diego padres',
              'SF': 'arizona diamondbacks',
              'COL': 'colorado rockies'},
            'NL_east': {
              'NYM': 'new york mets',
              'ATL': 'atlanta braves',
              'PHI': 'philadelphia phillies',
              'MIA': 'miami marlins',
              'WSH': 'washington nationals'},
            'NL_central': {
              'MIL': 'milwaukee brewers',
              'STL': 'st. lewis cardinals',
              'PIT': 'pittsburgh pirates',
              'CHC': 'chicago cubs',
              'CIN': 'cinncinati reds'
          }
          },
          'AL': {
            'AL_east': {
              'NYY': 'new york yankees',
              'TB': 'tampa bay rays',
              'BOS': 'boston red sox',
              'TOR': 'toronto blue jays',
              'BAL': 'baltimore orioles'
          },
            'AL_central': {
              'MIN': 'minnesota twins',
              'CLE': 'cleveland guardians',
              'CWS': 'chicago white sox',
              'DET': 'detroit tigers',
              'KC': 'kansas city royals',
            },
            'AL_west': {
              'HOU': 'houston astros',
              'SEA': 'seattle mariners',
              'TEX': 'texas rangers',
              'LAA': 'los angeles angels',
              'OAK': 'oakland athletics'
            }
                }},
        info: null,
        guess: "",
        guess_data: null,
        count: 0,
        show: [],
        correct: null,
        check_league: null,
        check_team: null,
        check_division: null,
        check_bat: null,
        check_throw: null,
        check_country: null,
        check_age: null,
        check_position: null,
        player_data:[],
        player_list: [],
        division: "",
        check_list: [],
        check_name: null,
        check_array: [],

      }
    },
    // template:`



    // `,

    mounted () {
      axios
        .get('https://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code=\'mlb\'&active_sw=\'Y\'&name_part='+ '\'' + this.player[Math.floor(Math.random() * this.player.length)] + '\'')
        .then(response => (this.info = response.data.search_player_all.queryResults))
    },

    
    computed: {
      checkCorrect: function(){
        if (this.guess_data.row.name_display_first_last != this.info.row.name_display_first_last){
           return false
        }else{
           return true
        }
      },
       checkLeague: function(){
        if (this.guess_data.row.league === this.info.row.league){
          return 2
        }else {
          return 0
        }
      },

      checkTeam: function(){
        var NL_west_str = JSON.stringify(this.league.NL.NL_west)
        var guess_nl_west = NL_west_str.includes(this.guess_data.row.team_abbrev)
        var info_nl_west = NL_west_str.includes(this.info.row.team_abbrev)

        var NL_east_str = JSON.stringify(this.league.NL.NL_east)
        var guess_nl_east = NL_east_str.includes(this.guess_data.row.team_abbrev)
        var info_nl_east = NL_east_str.includes(this.info.row.team_abbrev)

        var NL_central_str = JSON.stringify(this.league.NL.NL_central)
        var guess_nl_central = NL_central_str.includes(this.guess_data.row.team_abbrev)
        var info_nl_central = NL_central_str.includes(this.info.row.team_abbrev)

        var AL_west_str = JSON.stringify(this.league.AL.AL_west)
        var guess_al_west = AL_west_str.includes(this.guess_data.row.team_abbrev)
        var info_al_west = AL_west_str.includes(this.info.row.team_abbrev)

        var AL_central_str = JSON.stringify(this.league.AL.AL_central)
        var guess_al_central = AL_central_str.includes(this.guess_data.row.team_abbrev)
        var info_al_central = AL_central_str.includes(this.info.row.team_abbrev)

        var AL_east_str = JSON.stringify(this.league.AL.AL_east)
        var guess_al_east = AL_east_str.includes(this.guess_data.row.team_abbrev)
        var info_al_east = AL_east_str.includes(this.info.row.team_abbrev)
        if (this.guess_data.row.team_abbrev === this.info.row.team_abbrev){
          return 2
        }else if(this.guess_data.row.league != this.info.row.league){
          return 0
        }else if (this.guess_data.row.league === 'NL' && this.info.row.league === 'NL'){
          
          if (guess_nl_west === true && info_nl_west === true){
            return 1
          }else if (guess_nl_central === true && info_nl_central === true){
            return 1
          }else if(guess_nl_east === true && info_nl_east === true){
            return 1
          }else {
            return 0
          }
        }else if (this.guess_data.row.league === 'AL' && this.info.row.league === 'AL'){
          
          if (guess_al_west === true && info_al_west === true){
            return 1
          }else if (guess_al_central === true && info_al_central === true){
            return 1
          }else if(guess_al_east === true && info_al_east === true){
            return 1
          }else{
            return 0
          }
        }else{
          return 0
        }
      },

      checkDivision: function(){
          var NL_west_str = JSON.stringify(this.league.NL.NL_west)
          var guess_nl_west = NL_west_str.includes(this.guess_data.row.team_abbrev)
          var info_nl_west = NL_west_str.includes(this.info.row.team_abbrev)

          var NL_east_str = JSON.stringify(this.league.NL.NL_east)
          var guess_nl_east = NL_east_str.includes(this.guess_data.row.team_abbrev)
          var info_nl_east = NL_east_str.includes(this.info.row.team_abbrev)

          var NL_central_str = JSON.stringify(this.league.NL.NL_central)
          var guess_nl_central = NL_central_str.includes(this.guess_data.row.team_abbrev)
          var info_nl_central = NL_central_str.includes(this.info.row.team_abbrev)

          var AL_west_str = JSON.stringify(this.league.AL.AL_west)
          var guess_al_west = AL_west_str.includes(this.guess_data.row.team_abbrev)
          var info_al_west = AL_west_str.includes(this.info.row.team_abbrev)

          var AL_central_str = JSON.stringify(this.league.AL.AL_central)
          var guess_al_central = AL_central_str.includes(this.guess_data.row.team_abbrev)
          var info_al_central = AL_central_str.includes(this.info.row.team_abbrev)

          var AL_east_str = JSON.stringify(this.league.AL.AL_east)
          var guess_al_east = AL_east_str.includes(this.guess_data.row.team_abbrev)
          var info_al_east = AL_east_str.includes(this.info.row.team_abbrev)

        if (this.guess_data.row.league === 'AL' && this.info.row.league === 'NL'){
          if ( info_nl_west === true && guess_al_west === true){
            return 1
          }else if (info_nl_central === true && guess_al_central === true){
            return 1
          }else if (info_nl_east === true && guess_al_east === true){
            return 1
          }else{
            return 0
          }
        }else if (this.guess_data.row.league === 'NL' && this.info.row.league === 'AL'){
          if (guess_nl_west === true && info_al_west === true){
            return 1
          }else if (guess_nl_central === true && info_al_central === true){
            return 1
          }else if (guess_nl_east === true && info_al_east === true){
            return 1
          }else {
            return 0
          }
        }else if (this.guess_data.row.league === 'NL' && this.info.row.league === 'NL'){
          if (guess_nl_west === true && info_nl_west === true){
            return 2
          }else if (guess_nl_central === true && info_nl_central === true){
            return 2
          }else if(guess_nl_east === true && info_nl_east === true){
            return 2
          }else {
            return 0
          }
        }else if (this.guess_data.row.league === 'AL' && this.info.row.league === 'AL'){
          if (guess_al_west === true && info_al_west === true){
            return 2
          }else if (guess_al_central === true && info_al_central === true){
            return 2
          }else if(guess_al_east === true && info_al_east === true){
            return 2
          } else{
            return 0
          }
        }else{
          return 0
        }
      },

      checkBat: function(){
        if (this.guess_data.row.bats === this.info.row.bats){
          return 2
        }else {
          return 0
        }
      },

      checkThrow: function(){
        if (this.guess_data.row.throws === this.info.row.throws){
          return 2
        }else {
          return 0
        }
      },

      checkCountry: function(){
        if(this.guess_data.row.birth_country === this.info.row.birth_country){
          return 2
        }else {
          return 0}
      },

      checkAge: function(){
        guess_age = parseInt(this.guess_data.row.birth_date.slice(0,4))
        info_age = parseInt(this.info.row.birth_date.slice(0,4))
        if (guess_age === info_age){
          return 2
        }else if (guess_age >= info_age-5 && guess_age <= info_age+5){
          return 1
        }else{
          return 0
        }
      },

      checkPosition: function(){
        guess_position = this.guess_data.row.position_id
        info_position = this.info.row.position_id

        if(guess_position === info_position){
          return 2
        }else if(info_position === '9' || info_position === '8' || info_position === '7'){
          if(guess_position == '9' || guess_position === '8' || guess_position === '7'){
            return 1
          }else{
            return 0
          }
        }else if(info_position === '4' || info_position === '6'){
          if(guess_position === '4' || guess_position === '6'){
            return 1
          }else{
            return 0
          }
        }else if(info_position === '3' || info_position == '5'){
          if(guess_position === '3' || info_position === '5'){
            return 1
          }else {
            return 0
          }
        }else {
          return 0
        }
      }
        
      },

    methods: {
      newGuess: function(){
        this.guess = this.guess  
        axios({
          method: 'get',
          url: 'https://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code=\'mlb\'&active_sw=\'Y\'&name_part='+ '\'' + this.guess + '\''
        })
        .then(
          response => {
            this.guess_data = response.data.search_player_all.queryResults;
            if(this.guess_data.totalSize === '1'){
              this.show.push(this.guess)
              this.count++}
              this.guess =''})
        .catch(error => console.log(error))      
      },

      checkValues(){
        var NL_west_str = JSON.stringify(this.league.NL.NL_west)
        var guess_nl_west = NL_west_str.includes(this.guess_data.row.team_abbrev)
        var info_nl_west = NL_west_str.includes(this.info.row.team_abbrev)

        var NL_east_str = JSON.stringify(this.league.NL.NL_east)
        var guess_nl_east = NL_east_str.includes(this.guess_data.row.team_abbrev)
        var info_nl_east = NL_east_str.includes(this.info.row.team_abbrev)

        var NL_central_str = JSON.stringify(this.league.NL.NL_central)
        var guess_nl_central = NL_central_str.includes(this.guess_data.row.team_abbrev)
        var info_nl_central = NL_central_str.includes(this.info.row.team_abbrev)

        var AL_west_str = JSON.stringify(this.league.AL.AL_west)
        var guess_al_west = AL_west_str.includes(this.guess_data.row.team_abbrev)
        var info_al_west = AL_west_str.includes(this.info.row.team_abbrev)

        var AL_central_str = JSON.stringify(this.league.AL.AL_central)
        var guess_al_central = AL_central_str.includes(this.guess_data.row.team_abbrev)
        var info_al_central = AL_central_str.includes(this.info.row.team_abbrev)

        var AL_east_str = JSON.stringify(this.league.AL.AL_east)
        var guess_al_east = AL_east_str.includes(this.guess_data.row.team_abbrev)
        var info_al_east = AL_east_str.includes(this.info.row.team_abbrev)

        guess_age = parseInt(this.guess_data.row.birth_date.slice(0,4))
        info_age = parseInt(this.info.row.birth_date.slice(0,4))

        guess_position = this.guess_data.row.position_id
        info_position = this.info.row.position_id

        console.log(this.guess_data)
        if (this.guess_data.row.name_display_first_last != this.info.row.name_display_first_last){
          this.check_name = 0
          this.correct = false
        }else{
          this.check_name = 2
          this.correct = true
        }
        if (this.guess_data.row.league === this.info.row.league){
          this.check_league = 2
        }else {
          this.check_league = 0
        }

        if (this.guess_data.row.league === 'NL'){
          
          if (guess_nl_west === true){
            this.division = "NL West"
          }else if (guess_nl_central === true){
            this.division = "NL Central"
          }else if(guess_nl_east === true){
            this.division = "NL East"
          }
        }else if (this.guess_data.row.league === 'AL'){
          
          if (guess_al_west === true){
            this.division = "AL West"
          }else if (guess_al_central === true){
            this.division = "AL Central"
          }else if(guess_al_east === true){
            this.division = "AL East"
          }
        }

        if (this.guess_data.row.team_abbrev === this.info.row.team_abbrev){
          this.check_team = 2
        }else{
          this.check_team = 0
        }

        if (this.guess_data.row.league === 'AL' && this.info.row.league === 'NL'){
          if ( info_nl_west === true && guess_al_west === true){
            this.check_division = 1
          }else if (info_nl_central === true && guess_al_central === true){
            this.check_division = 1
          }else if (info_nl_east === true && guess_al_east === true){
            this.check_division = 1
          }else{
            this.check_division = 0
          }
        }else if (this.guess_data.row.league === 'NL' && this.info.row.league === 'AL'){
          if (guess_nl_west === true && info_al_west === true){
            this.check_division = 1
          }else if (guess_nl_central === true && info_al_central === true){
            this.check_division = 1
          }else if (guess_nl_east === true && info_al_east === true){
            this.check_division = 1
          }else {
            this.check_division = 0
          }
        }else if (this.guess_data.row.league === 'NL' && this.info.row.league === 'NL'){
          if (guess_nl_west === true && info_nl_west === true){
            this.check_division = 2
          }else if (guess_nl_central === true && info_nl_central === true){
            this.check_division = 2
          }else if(guess_nl_east === true && info_nl_east === true){
            this.check_division = 2
          }else {
            this.check_division = 0
          }
        }else if (this.guess_data.row.league === 'AL' && this.info.row.league === 'AL'){
          if (guess_al_west === true && info_al_west === true){
            this.check_division = 2
          }else if (guess_al_central === true && info_al_central === true){
            this.check_division = 2
          }else if(guess_al_east === true && info_al_east === true){
            this.check_division = 2
          } else{
            this.check_division = 0
          }
        }else{
          this.check_division = 0
        }

        if (this.guess_data.row.bats !== this.info.row.bats){
          this.check_bat = 0
        }else {
          this.check_bat = 2
        }

        if (this.guess_data.row.throws === this.info.row.throws){
          this.check_throw = 2
        }else {
          this.check_throw = 0
        }

        if(this.guess_data.row.birth_country === this.info.row.birth_country){
          this.check_country = 2
        }else {
          this.check_country = 0
        }

        if (guess_age === info_age){
          this.check_age = 2
        }else if (guess_age >= info_age-5 && guess_age <= info_age+5){
          this.check_age = 1
        }else{
          this.check_age = 0
        }

        if(guess_position === info_position){
          this.check_position = 2
        }else if(info_position === '9' || info_position === '8' || info_position === '7'){
          if(guess_position == '9' || guess_position === '8' || guess_position === '7'){
            this.check_position = 1
          }else{
            this.check_position = 0
          }
        }else if(info_position === '4' || info_position === '6'){
          if(guess_position === '4' || guess_position === '6'){
            this.check_position = 1
          }else{
            this.check_position = 0
          }
        }else if(info_position === '3' || info_position == '5'){
          if(guess_position === '3' || info_position === '5'){
            this.check_position = 1
          }else {
            this.check_position = 0
          }
        }else {
          this.check_position = 0
        }

        this.player_data = [this.guess_data.row.name_display_first_last, this.guess_data.row.team_full, this.division, this.guess_data.row.bats, this.guess_data.row.throws, this.guess_data.row.birth_country, this.guess_data.row.birth_date.slice(0,4), this.guess_data.row.position]
        this.player_list.push(this.player_data)
        this.check_list = [this.check_name, this.check_team, this.check_division, this.check_bat, this.check_throw, this.check_country, this.check_age, this.check_position]
        this.check_array.push(this.check_list)
        console.log(this.check_list)

        if (this.correct === true){
          alert(`You Won! It took you ${this.count} guesses!`)
        }else if(this.correct === false && this.count === 9){
          alert(`You lose! The player was ${this.info.row.name_display_first_last}`)
        }
      },


    },
    // checkCorrect: function(){
    //   if (this.guess_data.row.name_display_first_last != this.info.row.name_display_first_last){
    //     this.$set(this, this.correct, false)
    //   }else{
    //     this.$set(this, this.correct, true)
    //   }
    // },
  })

