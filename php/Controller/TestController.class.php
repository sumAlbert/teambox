<?php
class TestController extends Controller{
	function testMethod(){
		$model=new TestModel();
		$this->set("result",$model->testMethod());
	}
}