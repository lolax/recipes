
exports.seed = function(knex, Promise) {
  return knex('recipes').truncate()
    .then(function () {
      return knex('recipes').insert([
        { dish: 'balsamic shallot "risotto"', description: 'relatively easy rice dish with high parm content', time: 40 },
        { dish: 'mushroom risotto', description: 'difficult & often unrewarding', time: 50 },
        { dish: 'chickpea quacos', description: 'very delicious soft tacos', time: 30 },
        { dish: 'pasta aglio e olio', description: 'garlic and olive oil with trace amounts of pasta', time: 25 },
        { dish: 'southern granmda mac & cheese', description: 'classic, cheesy, cholesterol', time: 20 },
        { dish: 'garlic tomato grilled cheese', description: 'the offspring of garlic bread and pizza', time: 15 },
        { dish: 'soft egg toast', description: 'almost undercooked, worth the gamble', time: 10 },
        { dish: 'avocado toast', description: 'dreamlike for breakfast, lunch, and/or dinner', time: 5 },
        { dish: 'cinnamon maple brioche toast', description: 'soft, sweet, and deceptively simple', time: 5 },
        { dish: 'sausage homefries', description: 'an early, hearty staple from our upper east side kitchen', time: 20 },
        { dish: 'chili', description: 'a meal prep to rule them all', time: 60 },
        { dish: 'kale chips', description: 'quick and crispy treat', time: 5 },
        { dish: 'lola\'s pineapple upsidedown cake', description: 'perfect for election night and any occasion and no occasion', time: 60 },
        { dish: 'umeboshi onigiri', description: 'not as good as those in Japanese 7/11s, but still fun', time: 50 },
        { dish: 'red pesto pasta', description: 'an ostensibly italian dish we picked up in france', time: 30 },
        { dish: 'porcini mushroom ravioli', description: 'in case trader joes ever stops selling them', time: 80 },
        { dish: 'holy quacamole', description: 'sacred, godly', time: 10 },
        { dish: 'croquettes [DEPRECATED]', description: 'do not attempt', time: 250 },
      ])
    })
}
