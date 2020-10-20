addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
const links = [
  { 'name': 'My Professional Website', 'url': 'https://cthnn.github.io/' },
  { 'name': 'My Favorite Project', 'url': 'https://github.com/Cthnn/VIP-Autonomous-Car' },
  { 'name': 'A Link to my Favorite Song', 'url': 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }
]
const socials = [
  {'name':'LinkedIn','svg':'https://simpleicons.org/icons/linkedin.svg','link':'https://www.linkedin.com/in/cthann/'},
  {'name':'Instagram','svg':'https://simpleicons.org/icons/instagram.svg','link':'https://www.instagram.com/cth_n/'},
  {'name':'Github','svg':'https://simpleicons.org/icons/github.svg','link':'https://github.com/Cthnn'}
]
/**
 * Respond with hello worker text
 * @param {Request} request
 */
class LinksTransformer {
  constructor(links) {
    this.links = links
  }
  
  async element(element) {
    for (var link of this.links){
      element.append(`<a href='${link.url}'>${link.name}</a>`, { html: true });
    }
  }
}
class ProfileTransformer {
  async element(element) {
    element.removeAttribute('style')
  }
}
class AvatarTransformer {
  async element(element) {
    element.setAttribute('src', 'https://static-cdn.jtvnw.net/jtv_user_pictures/8fd15424-ab97-4249-ad18-4b0109befd16-profile_image-300x300.png');
  }
}
class NameTransformer {
  async element(element) {
    element.setInnerContent('Cthan');
  }
}
class SocialsTransformer{
  constructor(socials) {
    this.socials = socials
  }
  async element(element) {
    for (var social of this.socials){
      element.append(`<a href='${social.link}'><img src='${social.svg}'></img></a>`,{ html: true })
    }
  }
}
class TitleTransformer{
  async element(element) {
    element.setInnerContent('Ethan Cheung');
  }
}
class BgTransformer{
  async element(element) {
    element.setAttribute('style','background-color: #3760a7');
  }
}
async function handleRequest(request) {
  if (request.url.split('/').pop() == 'links'){
    const data = JSON.stringify(links)
    return new Response(data, {
      headers: { 'content-type': 'application/json;charset=UTF-8' },
    })
  }
  else{
    const resp =  await fetch('https://static-links-page.signalnerve.workers.dev',{
      headers: { 'content-type': 'text/html' },
    })
    return new HTMLRewriter().on('div#links',new LinksTransformer(links))
    .on('div#profile',new ProfileTransformer())
    .on('img#avatar', new AvatarTransformer())
    .on('h1#name',new NameTransformer())
    .on('div#social',new ProfileTransformer())
    .on('div#social', new SocialsTransformer(socials))
    .on('title', new TitleTransformer())
    .on('body', new BgTransformer())
    .transform(resp);
  }
  
}

