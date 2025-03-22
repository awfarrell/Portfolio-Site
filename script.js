document.addEventListener("DOMContentLoaded", function ()
{
    const sections = document.querySelectorAll(".section");
    console.log(`Bio Section Top: ${sections[0].getBoundingClientRect().top}`);

    function revealSections()
    {
        sections.forEach((section, index) =>
        {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionBottom = section.getBoundingClientRect().bottom;
            const triggerPoint = window.innerHeight * 0.9; // Adjust this if needed

            console.log(`Section ${index + 1}: Top = ${sectionTop}, Bottom = ${sectionBottom}`); // Log position for first section

            if (sectionTop < triggerPoint && sectionBottom > 100) {
                section.classList.add("visible");
            }

            else if (sectionBottom < 50 || sectionTop > window.innerHeight)
            {
                section.classList.remove("visible");
            }
        });
    }

    window.addEventListener("scroll", revealSections);
    window.addEventListener("resize", revealSections);
    revealSections(); // Run on page load in case some sections are already in view
});