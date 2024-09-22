import os

# Main page
main_html_path = '../templates/main.html'

# Parts for main page
main_header_path = '../parts/main/main_header.html'
main_about_me_path = '../parts/main/main_section_about_me.html'
main_projects_path = '../parts/main/main_section_projects.html'
main_footer_path = '../parts/main/main_footer.html'

# Read the main HTML template
with open(main_html_path, 'r', encoding='utf-8') as file:
    compiled_html = file.read()

# Read parts and replace placeholders
parts = {
    '{{ main_header.html }}': main_header_path,
    '{{ main_section_about_me.html }}': main_about_me_path,
    '{{ main_section_projects.html }}': main_projects_path,
    '{{ main_footer.html }}': main_footer_path,
}

for placeholder, path in parts.items():
    with open(path, 'r', encoding='utf-8') as file:
        part_content = file.read()
        compiled_html = compiled_html.replace(placeholder, part_content)

# Write the compiled HTML to a new file
output_path = '../output/main_index.html'
with open(output_path, 'w', encoding='utf-8') as file:
    file.write(compiled_html)

print("Successfully compiled main_index.html!")
