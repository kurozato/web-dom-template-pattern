//intelliSense
import { SinonIntelliSense } from './intelliSense/SinonIntelliSense.js';
const sinon = new SinonIntelliSense();

// unit test target
import { SearchView } from './target/js/view/searchView.js' 
import { SearchService } from './target/js/model/searchService.js' 
import { SearchPresenter } from './target/js/presenter/searchPresenter.js' 
import { URLQueryHepler } from './target/js/utility/urlQueryHepler.js'

import { Tea } from './whiteSuggar/Tea.js';

const tea = new Tea();
const assert = tea.assert;

tea.setup('mocha'); 

describe('title1', ()=>{
    describe('title11', ()=>{
        it('test-ok', ()=>{
            const serive = new SearchService();
            const view = new SearchView();
    
            const resolved = Promise.resolve({
                data: {},
            });
            sinon.stub(serive, 'getMainData').returns(resolved);
            sinon.stub(URLQueryHepler, 'replace').callsFake(() => { return {} });
    
            const mock = sinon.mock(view);
        
            mock.expects('setClickSearch').callsFake(() => { });
            mock.expects('initContent').once();
            mock.expects('getModel').once();
            mock.expects('drawContent').once();//never();
    
            const presenter = new SearchPresenter(view, serive);
    
            presenter.getData();
    
            return resolved.then(()=>{
                mock.verify();
            });
        });

    });
});

tea.run();

