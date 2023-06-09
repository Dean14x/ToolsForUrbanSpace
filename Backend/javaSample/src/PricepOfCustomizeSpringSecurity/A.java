package PricepOfCustomizeSpringSecurity;

public class A {

    public void testA(TestInterface<B> testInterface) {

        testInterface.custumize(new B());
        testInterface.custumize(new C());

    }

    public void testC(TestInterface<C> testInterface) {

        testInterface.custumize(new C());


    }
}
