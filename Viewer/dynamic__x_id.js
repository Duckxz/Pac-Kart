function gen_id() {

    let id_check = false
    while (id_check === false) {
        id = id_factory()

        if (id_list.includes(id)) {} else {
            id_check = true
        }
    }
    function id_factory() {
        var id = "id|" + Math.random().toString(16).slice(2)
        return id
    }

    id_list.push(id)

    return id

}

function delete_id(id) {

    let index = id_list.indexOf(id)
    if (index != -1) {
        id_list.splice(index, 1)
        return true
    } else {
        return null
    }

}

function find_id(id, type) {
    let temp_id = id
    console.log(id, 0)

    let temp = ''
    // console.log(id, type)
    var path = ''
    if (type === "x_d_folder") {
        if (XFA[0].id === id) {
            return temp = '[0]'
        }
        return ['idk']
    } else {
        for (let i = 1; i < XFA.length; i++) {
            find_id__file_list(XFA[i], i)
        }

    }

    function find_id__file_list(XFA, i) {
        let html = `[${i}]`
        if (type === 'x_d_sub_file') {
            if (XFA.id === id) {
                return temp = [html,i]
            }
        } else {
            if (XFA.type_s === 'link') {
                html += find_id__link_folder(XFA.type_data[0], html)
            }
        }

    }

    function find_id__link_folder(XFA, path_string) {
        let html = '.type_data[0]'

        if (type === 'x_d_link_folder') {
            if (XFA.id === id) {
                return temp = path_string + html
            }
        } else {
            if (type === 'x_d_link_main' || type === 'x_d_link_main_group' || type === 'x_d_link_main_sub_group') {
                html += find_id__link_main(XFA.section_main, path_string + html)
            }
            if (type === 'x_d_link_intro') {
                html += find_id__link_intro(XFA.section_intro, path_string + html)
            }
            if (type === 'x_d_link_demo' || type === 'x_d_link_main_sub_group') {
                if (XFA.section_demo[0] !== null) {

                    html += find_id__link_demo(XFA.section_demo, path_string + html)
                }
            }

        }
    }
    function find_id__link_intro(XFA, path_string) {
        let html = '.section_intro'
        if (type === 'x_d_link_intro') {
            return temp = [path_string + html,path_string]

        }
    }
    function find_id__link_demo(XFA, path_string) {
        let html = '.section_demo'
        if (type === 'x_d_link_demo') {
            return temp = [path_string + html,path_string]

        } else {
            html += '[0].link_array[0]'
            for (let i = 0; i < XFA[0].link_array[0].length; i++) {
                find_id__link_demo_sub_group(XFA[0].link_array[0][i], i, path_string + html)
            }
        }
    }

    function find_id__link_demo_sub_group(XFA, i, path_string) {
        if (type === 'x_d_link_main_sub_group') {
            // console.log(XFA.id, id)
            if (XFA.id === id) {
                return temp = [path_string + `[${i}]`, path_string, i]

            }

        } else {}
    }

    function find_id__link_main(XFA, path_string) {
        let html = '.section_main'
        if (type === 'x_d_link_main') {
            return temp = [path_string + html,path_string]

        } else {
            for (let i = 0; i < XFA.length; i++) {
                find_id__link_main_group(XFA[i], i, path_string + html)
            }

        }
        return ''
    }
    function find_id__link_main_group(XFA, i, path_string) {
        let html = `[${i}]`

        if (type === 'x_d_link_main_group') {
            if (XFA[1] === id) {
                return temp = [path_string + html, path_string, i]

            }
        } else {
            for (let i = 0; i < XFA[0].length; i++) {
                find_id__link_main_sub_group(XFA[0][i], i, path_string + html + '[0]')
            }
        }

    }
    function find_id__link_main_sub_group(XFA, i, path_string) {
        let html = `[${i}]`
        // console.log(XFA.id)
        if (type === 'x_d_link_main_sub_group') {
            if (XFA[1] === id) {
                return temp = [path_string + html + '[0]', path_string, i]

            }

        } else {}
    }

    return temp

}

id_list = []