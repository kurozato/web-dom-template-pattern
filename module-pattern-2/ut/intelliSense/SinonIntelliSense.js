export class SinonIntelliSense{
    /**
     * 
     * @param {Object} object 
     * @param {String} method 
     * @returns {SpyIntelliSense}
     */
    spy(object = {}, method = ''){
        return new SpyIntelliSense();
    }

    /**
     * 
     * @param {Object} object 
     * @param {String} method 
     * @returns {StubIntelliSense}
     */
    stub(object = {}, method = ''){
        return new StubIntelliSense();
    }

    /**
     * 
     * @param {obj} obj 
     * @returns {MockIntelligence}
     */
    mock(obj){
        return new MockIntelligence();
    }
}

export class SpyIntelliSense{
    get callCount() { return 0; }
    get called() { return false;}
    get notCalled() { return false;}
    get calledOnce() { return false;}
}

export class StubIntelliSense extends SpyIntelliSense{

    /**
     * 
     * @param {Function} fn 
     */
    callsFake(fn){}

    restore(){}

    /**
     * 
     * @param {Object} obj 
     */
    returns(obj){}
    
    /**
     * 
     * @param {Number} n 
     * @returns {StubIntelliSense}
     */
    onCall(n){
        return new StubIntelliSense(); 
    }

}

export class MockIntelligence {
    /**
     * 
     * @param {String} method 
     */
    expects(method){ return new Expectionlligence() }
    verify(){}
    restore(){}
}

export class Expectionlligence extends StubIntelliSense{
    never(){ return new Expectionlligence() }
    once(){ return new Expectionlligence() }
    /**
     * 
     * @param {Number} n 
     */
    exactly(n){ return new Expectionlligence() }
}

