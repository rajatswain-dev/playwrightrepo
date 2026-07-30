import { test, expect } from '../../../src/fixtures/gui-fixture';
import { AmazonPage } from '../../../src/pages/amazon/AmazonPage';


test.describe('test method',()=>{
let amazon:AmazonPage;
test.beforeEach( async({authenticatedPage})=>{
   amazon=new AmazonPage(authenticatedPage) 
})
  test('validata navigation to home screen and validating ui', async()=>{
    amazon.verifyVisibilitySearchBox();
    amazon.verifyVisibilityAmazonLogo();
    amazon.verifyVisibilityAccoutsAndList();
    amazon.verifyVisibilityReturnsAndOrder();
    amazon.verifyVisibilityCartButton();
  })
  test('validate accouts and list' ,async()=>{
   amazon.hoverOnAccountAndList()
   amazon.verifyVisibilityOfSignInBtn();
  })

})
