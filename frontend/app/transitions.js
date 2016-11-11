export default function(){
  this.transition(
    this.fromRoute('index'),
    this.toRoute('users'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
}
