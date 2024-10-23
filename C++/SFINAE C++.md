### SFINAE - C++ 
---

SFINAE, qui signifie "Substitution Failure Is Not An Error", est un concept en C++ utilisé dans le contexte de la programmation template. Il permet de déterminer à la compilation si un modèle de fonction ou de classe est valide, sans générer d'erreur de compilation. Si la substitution d'un type ou d'un argument dans une instanciation de modèle échoue, cela ne constitue pas une erreur ; le compilateur ignore simplement cette instanciation et cherche d'autres alternatives.

Explication détaillée
Modèles de fonction : Lorsqu'un modèle de fonction est utilisé, le compilateur tente de substituer les types fournis dans la définition du modèle. Si cette substitution échoue (par exemple, si un type n'est pas valide pour une opération donnée), cela n’entraîne pas une erreur fatale, mais indique plutôt que ce modèle ne doit pas être utilisé.

Utilisation courante : SFINAE est souvent utilisé avec des traits de type et des techniques de métaprogrammation. Cela permet de créer des modèles qui s'adaptent dynamiquement en fonction des types passés.

## Exemple :

Voici un exemple simple de SFINAE en utilisant std::enable_if :

````cpp
#include <iostream>
#include <type_traits>

// Modèle qui est activé uniquement si T est un entier
template<typename T>
typename std::enable_if<std::is_integral<T>::value>::type
foo(T t){
    std::cout << "T est un entier : " << t << std::endl;
}

// Modèle qui est activé uniquement si T est un flottant
template<typename T>
typename std::enable_if<std::is_floating_point<T>::value>::type
foo(T t){
    std::cout << "T est un flottant : " << t << std::endl;
}

int main(){
    foo(42);        // Appelle le modèle pour les entiers
    foo(3.14);     // Appelle le modèle pour les flottants
    // foo("text"); // Cela entraînera une erreur de compilation car c'est un type invalide
}
````
Dans cet exemple, selon le type passé à foo, le bon modèle sera choisi grâce à SFINAE. Si vous essayez d'appeler foo avec un type qui n'est ni un entier ni un flottant, le compilateur ne renverra pas d'erreur, mais plutôt il ne trouvera pas de modèle correspondant, ce qui peut être géré par des techniques supplémentaires.

Conclusion
SFINAE est un outil puissant pour écrire du code C++ plus flexible et générique. Il permet aux développeurs de créer des API plus robustes qui s'adaptent en fonction des types, sans nécessiter des vérifications de type explicites à chaque fois.