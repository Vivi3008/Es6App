class App{
    constructor(){
        this.repositories = []

        this.formEl = document.getElementById('repo-form')
        this.listEl = document.getElementById('repo-list')
        this.inputEl= document.querySelector('input[name=repository]')
       
        this.registerHandlers()
       
    }

    registerHandlers(){
        this.formEl.onsubmit =  event => this.addRepository(event)
    }

    setLoading(loading = true){
        if(loading === true){
            let loadingEl =  document.createElement('span')
            loadingEl.appendChild(document.createTextNode("Carregando..."))
            loadingEl.setAttribute('id','load')

            this.formEl.appendChild(loadingEl)
        }else{
            document.getElementById('load').remove()
        }
    }

 
    async addRepository(event){
        event.preventDefault()
        
        const user = this.inputEl.value
        if (user.length===0) return

        this.setLoading()

        try{
            const resp = await axios.get(`https://api.github.com/users/${user}`)
            
            const {name , bio, avatar_url, html_url, repos_url} = resp.data
            console.log(resp.data)
            this.repositories.push({
                name,
                bio,
                avatar_url,
                html_url,
                repos_url
            })

            this.inputEl.value = ""
            this.render()
           
        } catch(err){
            alert("O usuario nao existe")
        }

      this.setLoading(false)
       
    }


    render(){
        this.listEl.innerHTML=""

        this.repositories.forEach( repo =>{
            let img = document.createElement('img')
            img.setAttribute('src', repo.avatar_url)

            let titleEl = document.createElement('strong')
            titleEl.appendChild(document.createTextNode(repo.name))

            let bio = document.createElement('p')
            bio.appendChild(document.createTextNode(repo.bio))

            let link = document.createElement('a')
            link.setAttribute('href', repo.html_url)
            link.setAttribute('target', '_blank')
            link.appendChild(document.createTextNode('Acessar'))

            let linkRepo = document.createElement('a')
            linkRepo.setAttribute('href', repo.repos_url)
            linkRepo.setAttribute('target','_blank')
            linkRepo.appendChild(document.createTextNode(' Repositórios'))
            

            let li = document.createElement('li')
            li.appendChild(img)
            li.appendChild(titleEl)
            li.appendChild(bio)
            li.appendChild(link)
            li.appendChild(linkRepo)

            this.listEl.appendChild(li)
        })
    }
    
}

new App()