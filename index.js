import puppeteer from "puppeteer";

const scrapLinkdin = async()=>{
    try{
        const browser = await puppeteer.launch({headless: false})
        const page = await browser.newPage()

        await page.goto("https://www.linkedin.com/jobs/search/?currentJobId=3960300799&keywords=mlops&origin=BLENDED_SEARCH_RESULT_NAVIGATION_SEE_ALL&originToLandingJobPostings=3960300799%2C3959714046%2C3959702146",
            {
                waitUntil: 'networkidle2',
                timeout: 60000 // 60 seconds timeout
            }
        )
        console.log('outside page evaluate')
        const result = await data(page)
        const jsonResult = JSON.stringify(result, null, 2)
        console.log(jsonResult)
    } 
    catch(e){
        console.log(e)
    }
}

const data = async(page)=>{
    return await page.evaluate(()=>{
        const jobTitles = document.querySelectorAll('.jobs-search__results-list .base-search-card__title')
        const jobsLinks = document.querySelectorAll('.base-card__full-link')
        const jobLocations = document.querySelectorAll('.job-search-card__location')
        const jobPostDates = document.querySelectorAll('time')
        const companiesName = document.querySelectorAll('.base-search-card__subtitle')
        console.log('inside page evaluate')
        const jobsArr = []
    
    for (let i = 0; i < jobTitles.length; i++) {
        jobsArr.push({
        jobTitle: jobTitles[i]?.textContent.trim(),
        companyName: companiesName[i]?.textContent.trim(),
        CompanyLocation: jobLocations[i]?.textContent.trim(),
        postDate: jobPostDates[i]?.getAttribute('datetime'),
        applyLink: jobsLinks[i]?.href
        })
    }
    
    return jobsArr
    })
    
}
scrapLinkdin()
