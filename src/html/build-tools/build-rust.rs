use std::fs;

fn main() {
    // Main page
    let main_html_path = "../templates/main.html";

    // Parts for main page
    let main_header_path = "../parts/main/main_header.html";
    let main_about_me_path = "../parts/main/main_section_about_me.html";
    let main_projects_path = "../parts/main/main_section_projects.html";
    let main_footer_path = "../parts/main/main_footer.html";


    let mut compiled_html = fs::read_to_string(main_html_path)
        .expect("Failed to read main.html");


    let main_header_content = fs::read_to_string(main_header_path)
        .expect("Failed to read main_header.html");

    let main_about_me_content = fs::read_to_string(main_about_me_path)
        .expect("Failed to read main_section_about_me.html");

    let main_projects_content = fs::read_to_string(main_projects_path)
            .expect("Failed to read main_section_projects.html");

    let main_footer_content = fs::read_to_string(main_footer_path)
            .expect("Failed to read main_footer.html");

    // Replace placeholder with navigation content
    compiled_html = compiled_html.replace("{{ main_header.html }}", &main_header_content);
    compiled_html = compiled_html.replace("{{ main_section_about_me.html }}", &main_about_me_content);
    compiled_html = compiled_html.replace("{{ main_section_projects.html }}", &main_projects_content);
    compiled_html = compiled_html.replace("{{ main_footer.html }}", &main_footer_content);

    // Write the compiled HTML to a new file
    fs::write("../output/main_index.html", compiled_html)
        .expect("Failed to write main_index.html.html");
}
