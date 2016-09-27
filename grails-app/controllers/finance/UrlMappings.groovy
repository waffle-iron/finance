package finance

class UrlMappings {

    static mappings = {
        get "/$controller(.$format)?"(action:"index")
        get "/$controller/$id(.$format)?"(action:"show")
        post "/$controller(.$format)?"(action:"save")
        put "/$controller/$id(.$format)?"(action:"update")
        delete "/$controller/$id(.$format)?"(action:"delete")
//        patch "/$controller/$id(.$format)?"(action:"patch")

        "/"(view: '/index')
        "500"(view: '/error')
        "404"(view: '/notFound')
    }
}