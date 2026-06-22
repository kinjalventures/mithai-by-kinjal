import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Order from './components/Order';
import Reviews from './components/Reviews';
import Contact from './components/Contact';

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function App() {
  const [selection, setSelection] = useState({});
  const [specialReq, setSpecialReq] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);
  const [thankYouName, setThankYouName] = useState('Thank you! 🙏');

  function updateQty(id, qty) {
    setSelection(prev => {
      const next = { ...prev };
      if (qty <= 0) delete next[id];
      else next[id] = qty;
      return next;
    });
  }

  function handleOrderSuccess(name) {
    setThankYouName(name);
    setShowThankYou(true);
    setSelection({});
    setSpecialReq('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <>
      <Header scrollTo={scrollTo} />
      <Hero scrollTo={scrollTo} showThankYou={showThankYou} thankYouName={thankYouName} />
      <Menu
        selection={selection}
        onUpdate={updateQty}
        specialReq={specialReq}
        onSpecialReqChange={setSpecialReq}
      />
      <Order
        selection={selection}
        specialReq={specialReq}
        onOrderSuccess={handleOrderSuccess}
      />
      <Reviews />
      <Contact />
    </>
  );
}
