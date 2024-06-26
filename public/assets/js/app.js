document.addEventListener('DOMContentLoaded', () => {
  const userProfileURL = 'https://api.github.com/users/luisajardim';
  const userReposURL = 'https://api.github.com/users/luisajardim/repos';
  const teamMemberURLs = [
    'https://api.github.com/users/CarlosJFigueiredo',
    'https://api.github.com/users/gabialvarenga',
    'https://api.github.com/users/marcosffp'
  ];

  const carouselImages = [
    { src: '/public/assets/img/img/banner__1.png', alt: 'mulheres' },
    { src: '/public/assets/img/img/banner__2.png', alt: 'demencia digital' },
    { src: '/public/assets/img/img/banner__3.jpeg', alt: 'ada lovelace' },
    { src: '/public/assets/img/img/banner__4.webp', alt: 'allura' },
  ];

  // Função para obter dados do perfil do usuário
  async function getProfileData(url, elementId) {
    try {
      const response = await fetch(url);
      const profileData = await response.json();

      const profileHTML = `
        <img src="${profileData.avatar_url}" alt="Avatar de ${profileData.login}" class="img-fluid rounded-circle mb-3">
        <h1>${profileData.name}</h1>
        <p>${profileData.bio}</p>
        <a href="${profileData.html_url}" class="btn btn-primary" target="_blank">Ver perfil no GitHub</a>
      `;

      document.getElementById(elementId).innerHTML = profileHTML;
    } catch (error) {
      console.error('Erro ao obter dados do perfil:', error);
    }
  }

 // Função para obter dados dos repositórios do usuário
async function getRepoData() {
  try {
      const response = await fetch(userReposURL);
      const reposData = await response.json();

      const reposHTML = reposData.map(repo => `
          <div class="col-md-4 col-sm-6 repo-card">
              <div class="card">
                  <div class="card-body">
                      <div class="d-flex justify-content-between">
                          <h5 class="card-title">${repo.name}</h5>
                          <div class="text-end">
                              <ul class="list-inline">
                                  <li class="list-inline-item">Estrelas: ${repo.stargazers_count}</li>
                                  <li class="list-inline-item">Forks: ${repo.forks_count}</li>
                              </ul>
                          </div>
                      </div>
                      <p class="card-text">${repo.description || 'Sem descrição disponível.'}</p>
                      <a href="repo.html?repo=${repo.name}" class="btn btn-primary" target="_blank">Ver repositório</a>
                  </div>
              </div>
          </div>
      `).join('');

      document.getElementById('projects-content').innerHTML = reposHTML;
  } catch (error) {
      console.error('Erro ao obter dados dos repositórios:', error);
  }
}

  // Função para obter dados dos membros da equipe
  async function getTeamData() {
    try {
      const teamData = await Promise.all(teamMemberURLs.map(async (url) => {
        const response = await fetch(url);
        return await response.json();
      }));

      const teamHTML = teamData.map(member => `
        <div class="col-md-4">
          <div class="card">
            <img src="${member.avatar_url}" class="card-img-top" alt="Foto do membro da equipe">
            <div class="card-body">
              <h5 class="card-title">${member.login}</h5>
              <a href="${member.html_url}" class="btn btn-primary" target="_blank">Ver perfil</a>
            </div>
          </div>
        </div>
      `).join('');

      document.getElementById('team-content').innerHTML = teamHTML;
    } catch (error) {
      console.error('Erro ao obter dados da equipe:', error);
    }
  }

  // Função para carregar imagens no carousel
  function loadCarouselContent() {
    const carouselInner = document.querySelector('.carousel-inner');

    const carouselHTML = carouselImages.map((image, index) => `
      <div class="carousel-item ${index === 0 ? 'active' : ''}">
        <img src="${image.src}" class="d-block w-100" alt="${image.alt}">
        <div class="carousel-caption d-none d-md-block">
          <h5>Slide ${index + 1}</h5>
        </div>
      </div>
    `).join('');

    carouselInner.innerHTML = carouselHTML;
  }

  // Inicialização: carregar dados do perfil, repositórios e equipe
  getProfileData(userProfileURL, 'about-content');
  getRepoData();
  getTeamData();
  loadCarouselContent();
});
