<?php
namespace FifteenPuzzle\MainBundle\Manager;

use Doctrine\ORM\Decorator\EntityManagerDecorator;
use Doctrine\Common\EventManager;
use Doctrine\ORM\Configuration;

class UserManager extends EntityManagerDecorator
{
    /**
     *  Create function is needed for when extending EntityManagerDecorator 
     */
    public function create($conn, Configuration $config, EventManager $eventManager = null)
    {
        return new self(\Doctrine\ORM\EntityManager::create($conn, $config, $eventManager));
    }

    /**
     *  Schedules mysql event to delete user from database in one week 
     */
    public function scheduleDeleteInOneWeek($user)
    {
        $em = $this;
        $connection = $em->getConnection();
        $statement = $connection->prepare('
            CREATE EVENT delete_expired_' . $user->getId() . '
            ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL 1 WEEK DO
            DELETE FROM user WHERE id = :id
        ');
        $statement->bindValue('id', $user->getId());
        $statement->execute();
    }
}
