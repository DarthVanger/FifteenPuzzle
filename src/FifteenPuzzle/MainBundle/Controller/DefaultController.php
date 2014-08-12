<?php

namespace FifteenPuzzle\MainBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

/**
 *  Default controller, that just loads index.html.
 */
class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('FifteenPuzzleMainBundle:Default:index.html.twig');
    }
}
