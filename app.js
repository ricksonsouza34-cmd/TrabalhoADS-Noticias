const newsContainer = document.getElementById("news");
const searchInput = document.getElementById("search");
const statusText = document.getElementById("status");
const categoryLinks = document.querySelectorAll("[data-category]");
let allNews = [];
let selectedCategory = "Todas";
const demoNews = [
 {title:"Projetos buscam melhorar a qualidade de vida nas cidades",category:"Brasil",content:"Iniciativas em diferentes regiões procuram ampliar serviços e infraestrutura urbana.",image:"https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=900&q=80",created_at:new Date().toISOString()},
 {title:"Novas tecnologias fazem parte da rotina de estudantes",category:"Tecnologia",content:"Ferramentas digitais estão sendo utilizadas em atividades de estudo e pesquisa.",image:"https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",created_at:new Date().toISOString()},
 {title:"Atividades esportivas incentivam jovens",category:"Esportes",content:"Projetos de esporte e lazer incentivam a participação de jovens e crianças.",image:"https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=80",created_at:new Date().toISOString()},
 {title:"Encontro internacional debate desafios atuais",category:"Mundo",content:"Representantes discutem cooperação e questões de interesse internacional.",image:"https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=900&q=80",created_at:new Date().toISOString()}
];
let db = null;
if (supabaseConfigured && window.supabase) db = window.supabase.createClient(SUPABASE_URL,SUPABASE_ANON_KEY);
function escapeHTML(value=""){return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function renderNews(){
 if(!newsContainer)return;
 const term=(searchInput?.value||"").toLowerCase();
 const filtered=allNews.filter(n=>(selectedCategory==="Todas"||n.category===selectedCategory)&&`${n.title} ${n.content} ${n.category}`.toLowerCase().includes(term));
 newsContainer.innerHTML=filtered.length?filtered.map(n=>`<article class="news-card"><img src="${escapeHTML(n.image||"https://placehold.co/800x450?text=Noticia")}" alt=""><div class="category">${escapeHTML(n.category)}</div><h2>${escapeHTML(n.title)}</h2><p>${escapeHTML(n.content)}</p><div class="date">${n.created_at?new Date(n.created_at).toLocaleDateString("pt-BR"):""}</div></article>`).join(""):`<div class="empty">Nenhuma notícia encontrada.</div>`;
}
async function loadNews(){
 if(!newsContainer)return;
 if(db){const {data,error}=await db.from("news").select("*").order("created_at",{ascending:false});if(!error&&data){allNews=data;statusText.textContent="";renderNews();return;}statusText.textContent="Não foi possível carregar as notícias do banco. Exibindo exemplos.";}
 else statusText.textContent="Exibindo notícias de exemplo. Configure o Supabase para carregar os registros do banco.";
 allNews=demoNews;renderNews();
}
if(searchInput)searchInput.addEventListener("input",renderNews);
categoryLinks.forEach(a=>a.addEventListener("click",e=>{e.preventDefault();selectedCategory=a.dataset.category;categoryLinks.forEach(x=>x.classList.remove("active"));a.classList.add("active");renderNews();}));
loadNews();