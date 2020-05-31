const assert = require('assert');
const { Builder, By, until, Key } = require('selenium-webdriver');
const http = require('http');

let HttpAgent = new http.Agent({
  keepAlive: true,
});

describe('Google Search', function(){

	let driver;

	before(function(){

		let capabilities = {
			browserName: 'safari'
		};

		driver = new Builder()
		.usingHttpAgent(HttpAgent)
		.withCapabilities(capabilities)
		.usingServer('http://192.168.1.210:13096/wd/hub')
		.build();

	});

	it('should append query to the title', function(done){
		this.timeout(30000);
		driver.manage().window().maximize().then(()=>{
			driver.get("https://google.com").then(()=>{
				driver.findElement(By.name('q')).then((element)=>{
					element.sendKeys('Digital Vault', Key.RETURN).then(()=>{
						driver.wait(until.stalenessOf(element)).then(()=> driver.getTitle().then((title) => {
							assert.equal(title,'Digital Vault - Google Search');
							done();
						}));
					});
				});
			});

		});
	});

	after(function(){
		driver.quit();
	});

});